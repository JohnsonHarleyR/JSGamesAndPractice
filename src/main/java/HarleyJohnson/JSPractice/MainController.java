package HarleyJohnson.JSPractice;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import HarleyJohnson.JSPractice.dao.CommentDao;
import HarleyJohnson.JSPractice.entity.Comment;

@Controller
public class MainController {
	
	@Autowired
	CommentDao commentRepo;
	
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
	
	@RequestMapping("/css-animate")
	public String cssAnimate(Model model) {
		
		return "css-animate";
	}
	
	

	

}
