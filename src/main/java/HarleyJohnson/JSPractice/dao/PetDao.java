package HarleyJohnson.JSPractice.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import HarleyJohnson.JSPractice.entity.Pet;

public interface PetDao extends JpaRepository<Pet,Long> {
	
	Optional<Pet> findById(Long id);

}
