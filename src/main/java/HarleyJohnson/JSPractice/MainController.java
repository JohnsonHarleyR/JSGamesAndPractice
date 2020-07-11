package HarleyJohnson.JSPractice;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import HarleyJohnson.JSPractice.dao.CommentDao;
import HarleyJohnson.JSPractice.dao.PetDao;
import HarleyJohnson.JSPractice.entity.Comment;
import HarleyJohnson.JSPractice.entity.Pet;

@Controller
public class MainController {
	
	@Autowired
	CommentDao commentRepo;
	
	@Autowired
	PetDao petRepo;
	
	@Autowired HttpSession session;
	
	@RequestMapping("/")
	public String index(Model model) {
		
		
		return "index";
	}
	
	@RequestMapping("/comments")
	public String comments(Model model) {
		
		boolean areComments = false;
		List<Comment> comments = commentRepo.findAll();
		
		if (comments != null && comments.size() != 0) {
			areComments = true;
		}
		
		Collections.sort(comments);
		Collections.reverse(comments);
		
		model.addAttribute("arecomments", areComments);
		model.addAttribute("comments",comments);
		
		return "comments";
	}
	
	
	@RequestMapping("/comment/submit")
	public String submitComment(
			@RequestParam(name = "topic") String top,
			@RequestParam(name = "name") String name,
			@RequestParam(name = "title") String title,
			@RequestParam(name = "comment") String comment,
			Model model) {
		
		//Get datetime
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		LocalDateTime localDateTime = LocalDateTime.from(formatter.parse(timestampString));
		
		String topic = "";
		switch(top) {
		case "bugs":
			topic = "Code Bugs";
			break;
		case "ttt":
			topic = "Tic Tac Toe";
			break;
		case "ms":
			topic = "Minesweeper";
			break;
		case "rb":
			topic = "Roadside Bingo";
			break;
		case "su":
			topic = "Sudoku";
			break;
		case "sg":
			topic = "Snake Game";
		default:
			topic = "General";
			break;
		}
		
		//Create new comment object to save to repo
		Comment newComment = new Comment(localDateTime, name, title, topic, comment);
		commentRepo.save(newComment);
		
		
		return "redirect:/comments";
	}
	
	
	@RequestMapping("/TicTacToe")
	public String ticTacToe(Model model) {
		
		
		return "tic-tac-toe";
	}
	
	
	@RequestMapping("/minesweeper")
	public String mineSweeper(Model model) {
		
		
		return "minesweeper";
	}
	
	
	@RequestMapping("/roadside-bingo")
	public String roadsideBingo(Model model) {
		
		
		return "roadside-bingo";
	}
	
	
	@RequestMapping("/sudoku")
	public String sudoku(Model model) {
		
		return "sudoku";
	}
	
	@RequestMapping("/snake-game")
	public String snakeGame(Model model) {
		
		return "snake-game";
	}
	
	@RequestMapping("/feedable-pet")
	public String feedablePet(Model model) {
		
		boolean exists = true;
		
		//try to grab the pet from the session (in later versions, try to grab it based on logged user)
		Pet pet = (Pet)session.getAttribute("pet");
		
		//figure out if it's null or not
		if (pet == null) {
			exists = false;
		}
		
		//now grab parts of the pet to store in their own variable
		//The 'get' methods are specialized, so I want to be sure they're retrieved properly?
		//(I'll do this if it doesn't work)
		
		//now add both to the model
		model.addAttribute("exists", exists);
		model.addAttribute("pet", pet);
		
		return "pet/feedable-pet";
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
			) {
		boolean successful = true;
		
		Pet newPet = new Pet(name, type, gender, color);
		
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
