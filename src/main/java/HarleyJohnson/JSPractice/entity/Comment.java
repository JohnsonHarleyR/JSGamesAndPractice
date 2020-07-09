package HarleyJohnson.JSPractice.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name="comments")
public class Comment implements Comparable<Comment> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDateTime datetime;
	private String name;
	private String title;
	private String topic;
	private String comment;
	
	public Comment() {}
	
	public Comment(LocalDateTime datetime, String name, String title, String topic, String comment) {
		super();
		this.datetime = datetime;
		this.name = name;
		this.title = title;
		this.topic = topic;
		this.comment = comment;
	}

	
	//@return GET id
	public Long getId() {
		return id;
	}

	
	//@param SET id
	public void setId(Long id) {
		this.id = id;
	}

	
	//@return GET datetime
	public LocalDateTime getDatetime() {
		return datetime;
	}

	
	//@param SET datetime
	public void setDatetime(LocalDateTime datetime) {
		this.datetime = datetime;
	}

	
	//@return GET name
	public String getName() {
		return name;
	}

	
	//@param SET name
	public void setName(String name) {
		this.name = name;
	}

	
	//@return GET title
	public String getTitle() {
		return title;
	}

	
	//@param SET title
	public void setTitle(String title) {
		this.title = title;
	}

	
	//@return GET topic
	public String getTopic() {
		return topic;
	}

	
	//@param SET topic
	public void setTopic(String topic) {
		this.topic = topic;
	}

	
	//@return GET comment
	public String getComment() {
		return comment;
	}

	
	//@param SET comment
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	

	@Override
	public String toString() {
		return "Comment [id=" + id + ", datetime=" + datetime + ", name=" + name + ", title=" + title + ", topic="
				+ topic + ", comment=" + comment + "]";
	}

	@Override
	public int compareTo(Comment o) {
		if (datetime == o.getDatetime()) {
			return id.compareTo(o.getId());
		} else {
			return datetime.compareTo(o.getDatetime());
		}
	}

}
