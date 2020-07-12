package HarleyJohnson.JSPractice;

import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import HarleyJohnson.JSPractice.dao.PetDao;
import HarleyJohnson.JSPractice.entity.Pet;

@Controller
public class PetController {
	
	@Autowired
	PetDao petRepo;

	@Autowired
	HttpSession session;
	
	
	@RequestMapping("/feedable-pet")
	public String feedablePet(Model model) {
		
		boolean exists = true;
		
		/*
		//try to grab the pet from the session (in later versions, try to grab it based on logged user)
		Pet pet = (Pet)session.getAttribute("pet");
		
		
		}*/
		
		Pet pet;
		try {
			pet = (Pet)session.getAttribute("pet");
		} catch (Exception e) {
			pet = null;
		}
		
		//figure out if it's null or not
		if (pet == null) {
			exists = false;
		}
		
		//Pet pet = new Pet("Gordon", "test", "male", "blue");
		
		//now grab parts of the pet to store in their own variable
		//The 'get' methods are specialized, so I want to be sure they're retrieved properly?
		//(I'll do this if it doesn't work)
		
		//now add both to the model
		model.addAttribute("exists", exists);
		model.addAttribute("pet", pet);
		
		return "pet/feedable-pet";
	}
	
	@RequestMapping("/feed") 
	public String feedPet(
		@RequestParam("id") long id,
		@RequestParam("min") int min,
		@RequestParam("max") int max) {
		
		Pet pet;
		Optional<Pet> tempPet = petRepo.findById(id);
		pet = tempPet.get();
		
		System.out.println("Feeding pet");
		pet.feedPet(min, max);
		
		session.setAttribute("pet", pet);
		
		petRepo.save(pet);
		
		return "redirect:/feedable-pet";
	}
	
	@RequestMapping("/play") 
	public String playWithPet(
		@RequestParam("id") long id) {
		
		Pet pet;
		Optional<Pet> tempPet = petRepo.findById(id);
		pet = tempPet.get();
		
		System.out.println("Playing with pet");
		pet.playWithPet();
		
		session.setAttribute("pet", pet);
		
		petRepo.save(pet);
		
		return "redirect:/feedable-pet";
	}
	
	@RequestMapping("/love") 
	public String showPetLove(
		@RequestParam("id") long id) {
		
		Pet pet;
		Optional<Pet> tempPet = petRepo.findById(id);
		pet = tempPet.get();
		
		System.out.println("Showing love");
		pet.showPetLove();
		
		session.setAttribute("pet", pet);
		
		petRepo.save(pet);
		
		return "redirect:/feedable-pet";
	}
	
	
	@RequestMapping("/load-pet")
	public String loadPet(
			@RequestParam(name = "message", required = false) String message,
			Model model) {
		String newMessage = "";
		
		//use try catch for what message to give to the page
		try {
			newMessage = message;
		} catch (Exception e) {
			newMessage = "Load a pet by entering the ID.";
		}
		
		model.addAttribute("message", newMessage);
		
		return "pet/load-pet";
	}
	
	@RequestMapping("/load-pet/submit")
	public String loadPetSubmit(
			@RequestParam(name="id") String idString) {
		boolean successful = true;
		
		Long id = Long.parseLong(idString);
		
		System.out.println("Pet id: " + id);
		
		//Attempt to load pet
		Pet pet;
		Optional<Pet> tempPet = petRepo.findById(id);
		
		try {
			pet = tempPet.get();
			session.setAttribute("pet", pet);
		} catch (Exception e) {
			successful = false;
		}
		
		//make it so there's a message that displays if it fails
		if (successful) {
			return "redirect:/feedable-pet";
		} else {
			String message = "Could not find.";
			return "redirect:/load-pet?message=" + message;
		}
		
	}
	
	@RequestMapping("/create-pet")
	public String createPet() {
		
		return "pet/create-pet";
	}
	
	@RequestMapping("/create-pet/submit")
	public String createPetSubmit(
			@RequestParam(name = "name") String name,
			@RequestParam(name = "type") String type,
			@RequestParam(name = "gender") String gender,
			@RequestParam(name = "color") String color
			//add environment
			) {
		boolean successful = true;
		
		Pet newPet = new Pet(name, type, gender, color, "default"); //change default after I have environments
		
		//now save to a repo
		petRepo.save(newPet);
		
		//now add pet to the session
		session.setAttribute("pet", newPet);
		
		if (successful) {
			return "redirect:/feedable-pet";
		} else {
			return "redirect:/create-pet";
		}
		
	}

}
