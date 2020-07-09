package HarleyJohnson.JSPractice.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import HarleyJohnson.JSPractice.entity.Comment;

public interface CommentDao extends JpaRepository<Comment,Long>{
	
	Optional<Comment> findById(Long id);
	List<Comment> findByDatetime(LocalDateTime datetime);
	List<Comment> findByName(String name);
	List<Comment> findByTopic(String topic);

}
