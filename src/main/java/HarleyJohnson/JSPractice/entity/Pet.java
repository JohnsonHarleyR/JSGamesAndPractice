package HarleyJohnson.JSPractice.entity;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/*y=a(1-b)x 
 * 
 * In mathematics, exponential decay describes the process of reducing an amount by a 
 * consistent percentage rate over a period of time. It can be expressed by 
 * the formula y=a(1-b)x wherein y is the final amount, a is the original amount, b is the 
 * decay factor, and x is the amount of time that has passed.
 */

//EXTENDED
//also allow the pet to appear to be sleeping when it's between 10pm and 7am;
//if it's a baby, have them sleeping from 8pm to 7am and at random nap times throughout the day


//DON'T BE TOO PICKY ABOUT LOGIC WITH THIS lol


@Entity
@Table(name="pets")
public class Pet {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String owner;
	private LocalDateTime birthday;
	private String type; //type of pet
	private String gender;
	private int stage; //1 is egg, 2 is baby, 3 is child
	@Transient
	private int growStage;
	private String color;
	private String mood; // this will take the average of their need bars
	@Transient
	private String image;
	
	private int hunger; //this is out of 100;
	private int play;
	private int love;
	private int progress; //this will depend on the level
	@Transient
	private int percent;
	@Transient
	private int minProgress;
	@Transient
	private int maxProgress;
	@Transient
	private int progressNumber;
	@Transient
	private long age;
	
	private LocalDateTime lastFeed;
	private LocalDateTime lastPlay;
	private LocalDateTime lastLove;
	
	private String environment;
	
	public Pet() {}
	
	public Pet(String name, String owner, String type, String gender, String color, String environment) {
		super();
		this.name = name;
		this.owner = owner;
		this.type = type;
		this.gender = gender;
		this.color = color;
		this.environment = environment;
		
		hunger = 80;
		play = 80;
		love = 45;
		
		stage = 1;
		growStage = 1;
		progress = 0;
		
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		LocalDateTime localDateTime = LocalDateTime.from(formatter.parse(timestampString));
		
		birthday = localDateTime;
		lastFeed = localDateTime;
		lastPlay = localDateTime;
		lastLove = localDateTime;
		
		//these will actually be the last time they were loaded, not the last time they were given that
		
		progressNumber = getProgressNumber();
		
	}
	
	//Egg should take 1 day and 50 pts
	//Baby should take at least 5 days and 500 pts
	//Child is permanent for now - add more stages later
	
	public void feedPet(int min, int max) {
		
		int amount = (int) ((Math.random() * (max - min)) + min);
		int orig = hunger;
		
		hunger += amount;
		
		System.out.println("Hunger increase: " + amount);
		
		//check if it's over 100 or play is less than 0
		if (hunger >= 100) {
			amount = 100 - orig;
			hunger = 100;
		}
		
		//add to progress too
		if (orig < hunger) {
			progress += amount;
		}
		
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		lastFeed = LocalDateTime.from(formatter.parse(timestampString));
		
		
	}
	
	
	public void playWithPet() {
		
		//TODO make it so you can't play with a pet if it is too hungry - do that with javascript alert
		final int MAX = 40;
		final int MIN = 15;
		
		int amount = (int) ((Math.random() * (MAX - MIN)) + MIN);
		int orig = play;
		
		//add it to the amount
		play += amount;
		
		System.out.println("Play increase: " + amount);
		
		//also take away hunger, they want to play more after eating
		if (play < 100) {
			int hungerAmount = (int)(amount / 1.5);
			hunger -= hungerAmount;
		}

		
		
		//check if it's over 100 or hunger is less than 0
		if (play >= 100) {
			amount = 100 - orig;
			play = 100;
		} 
		
		if (hunger < 0) {
			hunger = 0;
		}
		
		//add to progress too
		if (orig < play) {
			progress += amount;
		}
		
		//add player points here too
		
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		lastPlay = LocalDateTime.from(formatter.parse(timestampString));
	}
	
	public void showPetLove() {
		
		//TODO make it so you can't play with a pet if it is too hungry - do that with javascript alert
		final int MAX = 40;
		final int MIN = 15;
		
		int amount = (int) ((Math.random() * (MAX - MIN)) + MIN);
		int orig = love;
		
		love += amount;
		
		System.out.println("Love increase: " + amount);
		
		//check if it's over 100
		if (love >= 100) {
			amount = 100 - orig;
			love = 100;
		}
		
		//add player points here too
		
		//add to progress too
		if (orig < love) {
			progress += amount;
		}
		
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		lastLove = LocalDateTime.from(formatter.parse(timestampString));
	}
	
	public double getHungerDecayRate() {
		double rate;
		calculateStage();
		
		if (stage == 1) {
			rate = 0;
		} else if (stage == 2) {
			//35 points down every 8 hours (480 minutes)
			rate = 0.000897464408526;
		} else {
			//30 points down every 8 hours (480 minutes)
			rate = 0.000743072799872;
		}
		return rate;
	}
	
	public double getPlayDecayRate() {
		double rate = 0;
		calculateStage();
		
		if (stage == 1) {
			rate = 0;
		} if (stage == 2) {
			rate = 0.00371905918857; //20 points an hour
		} else if (stage == 3) {
			rate = 0.00270864882496; ////15 points an hour - the older, the lower the decay
		}
		return rate;
	}
	
	public double getLoveDecayRate() {
		double rate = 0;
		calculateStage();
		
		
		if (stage == 1) {
			rate = 0.00371905918857; //20 points an hour
		} else if (stage == 2) {
			rate = 0.00270864882496; //15 points an hour
		} else {
			rate = 0.0017560085943; //10 points an hour - the older, the lower the decay
		}
		
		return rate;
	}
	
	public void calculateMood() {
		//take the average of the three needs
		double average = (getHunger() + getPlay() + getLove()) / 3;
		
		//now match the number according to mood
		if (average >= 75) {
			mood = "great";
		} else if ( average >= 50) {
			mood = "good";
		} else if (average >= 25) {
			mood = "okay";
		} else {
			mood = "bad";
		}
	}
	
	//Determining all the other factors
	
	public int calculateAfterDecay(String kind) {
		double decayRate;
		int startAmount;
		LocalDateTime last;
		
		int finalAmount = 0;
		
		//figure out which rate to grab
		if (kind.equals("hunger")) {
			decayRate = getHungerDecayRate();
			startAmount = hunger;
			last = lastFeed;
		} else if (kind.equals("play")) {
			decayRate = getPlayDecayRate();
			startAmount = play;
			last = lastPlay;
		} else {
			decayRate = getLoveDecayRate();
			startAmount = love;
			last = lastLove;
		}
		
		System.out.println("\nKind: " + kind);
		System.out.println("Stage: " + stage);
		System.out.println("Start amount: " + startAmount);
		System.out.println("Last time: " + last);
		System.out.println("Decay rate: " + decayRate);
		
		//get difference between then and now
		LocalDateTime start = last;
		LocalDateTime end = LocalDateTime.now();
		Long time = Duration.between(start, end).toMinutes();
		
		System.out.println("Duration time: " + time);
		
		//now calculate the amount with the formula  
		//P(t) = P0e-rt
		/*where:
			P(t) = the amount of some quantity at time t
			P0 = initial amount at time t = 0
			r = the decay rate
			t = time (number of periods)*/
		//finalAmount = (int)(startAmount * (1 - decayRate) * time);
		
		//double result = Math.pow(4,2); //reference
		//a * FastMath.exp(-numCall * oneOverB);
		//double expon = -(decayRate * time);
		finalAmount = (int) (startAmount * Math.exp(-decayRate * time));
		
		//System.out.println("Pet amount: " + finalAmount);
		
		//now make sure final amount isn't below 0
		if (finalAmount < 0) {
			finalAmount = 0;
		}
		
		return finalAmount;
	}
	
	public void calculateStage() {
		
		LocalDateTime today = LocalDateTime.now();
		long days = ChronoUnit.DAYS.between(birthday, today);
		//System.out.println("Days since birth: " + days);
		
		if (days < 1 || progress < 150) { //also check time since birthday
			growStage = 1;
		} else if (days < 5 || progress < 1200) { //also check time since birthday - 1 day for egg, 5 days for baby
			growStage = 2;
		} else if (days >= 5 && progress > 1200) { //find next stage up still
			growStage = 3;
		}
	}
	
	public int getStage() {
		return stage;
	}

	public void setStage(int stage) {
		this.stage = stage;
	}

	public void setAge(long age) {
		this.age = age;
	}

	public int getMinProgress() {
		calculateStage();
		
		//System.out.println("Stage: " + stage);
		
		if (stage == 1) {
			minProgress = 0;
		} else if (stage == 2) {
			minProgress = 150;
		} else {
			minProgress = 1200;
		}
		
		//System.out.println("Getting min progress: " + minProgress);
		
		return minProgress;
	}
	
	public int getMaxProgress() {
		calculateStage();
		
		System.out.println("Stage: " + stage);
		
		if (stage == 1) {
			maxProgress = 149;
		} else if (stage == 2) {
			maxProgress = 1199;
		} else {
			maxProgress = 11999;
		}
		//System.out.println("Getting max progress: " + maxProgress);
		//System.out.println("Current progress: " + progress);
		
		return maxProgress;
	}
	
	public int getProgressNumber() {
		//this is out of 100, it's basically a percent as an int
		if (progress == 0) {
			progressNumber = 0;
		} else {
			int number = (int)((progress / getMaxProgress()) * 100);
			progressNumber = number;
		}
		return progressNumber;
	}
	
	public int getHunger() {
		//if it's a baby, set the hunger to 50. Keep it there until it's a child
		//don't worry about hunger and play until then
		if (stage == 1) {
			hunger = 80;
		} else {
			hunger = calculateAfterDecay("hunger");
		}
		
		//to prevent errors
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		lastFeed = LocalDateTime.from(formatter.parse(timestampString));
		
		
		return hunger;
	}
	
	public int getPlay() {
		//if it's a baby, set the hunger to 50. Keep it there until it's a child
		//don't worry about hunger and play until then
		if (stage == 1) {
			play = 50;
		} else {
			play = calculateAfterDecay("play");
		}
		
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		lastPlay = LocalDateTime.from(formatter.parse(timestampString));
		
		return play;
	}
	
	public int getLove() {
		love = calculateAfterDecay("love");
		
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		lastLove = LocalDateTime.from(formatter.parse(timestampString));
		
		return love;
	}
	
	public long getAge() {
		LocalDateTime today = LocalDateTime.now();
		age = ChronoUnit.DAYS.between(birthday, today);
		return age;
	}
	
	public String getImage() {
		calculateMood(); //make sure the mood is up to date
		calculateStage();
		String url = "";
		
		//if it's an egg, there is no mood
		if (stage != 1) {
			url = "/fp/" + type + "/" + color + "/" + stage + "/"  + mood + ".png";
		} else {
			url = "/fp/" + type + "/" + color + "/" + stage + "/"  + "egg.png";
		}
		image = url;
		return image;
	}
	
	public void setImage(String image) {
		this.image = image;
	}
	
	
	//@return GET percent
	public int getPercent() {
		
		double startAmount = progress - getMinProgress();
		double endAmount = getMaxProgress() - getMinProgress();
		double temp;
		
		temp = (startAmount / endAmount) * 100;
		//System.out.println("\nTemp: " + temp);
		percent = (int) (temp);
		//System.out.println(startAmount + " out of " + endAmount + " is about " + percent + "%");
		
		
		//if progress is over max, then reset progress percent to 90% unless it is ready to grow
		calculateStage();
		System.out.println("\nGrow Stage: " + getGrowStage());
		if (percent >= 100 && getStage() == getGrowStage()) {
			percent = 90;
		}
		
		
		return percent;
	}

	
	//@param SET percent
	public void setPercent(int percent) {
		this.percent = percent;
	}

	
	//@param SET lastFeed
	public void setLastFeed(LocalDateTime lastFeed) {
		this.lastFeed = lastFeed;
	}

	
	//@param SET lastPlay
	public void setLastPlay(LocalDateTime lastPlay) {
		this.lastPlay = lastPlay;
	}

	
	//@param SET lastLove
	public void setLastLove(LocalDateTime lastLove) {
		this.lastLove = lastLove;
	}
	
	
	
	//ADDING POINTS

	public void addHungerPoints(int points) {
		hunger += points;
		progress += points;
	}
	
	public void addPlayPoints(int points) {
		play += points;
		progress += points;
	}
	
	public void addLovePoints(int points) {
		love += points;
		progress += points;
	}
	
	public void addProgressPoints(int points) {
		progress += points;
	}

	
	//@return GET id
	public Long getId() {
		return id;
	}

	
	//@param SET id
	public void setId(Long id) {
		this.id = id;
	}

	
	//@return GET name
	public String getName() {
		return name;
	}

	
	//@param SET name
	public void setName(String name) {
		this.name = name;
	}

	
	//@return GET birthday
	public LocalDateTime getBirthday() {
		return birthday;
	}

	
	//@param SET birthday
	public void setBirthday(LocalDateTime birthday) {
		this.birthday = birthday;
	}

	
	//@return GET type
	public String getType() {
		return type;
	}

	
	//@param SET type
	public void setType(String type) {
		this.type = type;
	}

	
	//@return GET gender
	public String getGender() {
		return gender;
	}

	
	//@param SET gender
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	

	
	//@return GET stage
	public int getGrowStage() {
		calculateStage();
		return growStage;
	}

	
	//@param SET stage
	public void setGrowStage(int growStage) {
		this.growStage = growStage;
	}
	
	

	
	
	//@return GET environment
	public String getEnvironment() {
		return environment;
	}

	
	//@param SET environment
	public void setEnvironment(String environment) {
		this.environment = environment;
	}

	//@return GET color
	public String getColor() {
		return color;
	}

	
	//@param SET color
	public void setColor(String color) {
		this.color = color;
	}

	
	//@return GET mood
	public String getMood() {
		calculateMood();
		return mood;
	}

	
	//@param SET mood
	public void setMood(String mood) {
		this.mood = mood;
	}

	
	//@return GET progress
	public int getProgress() {
		
		
		
		return progress;
	}

	
	//@param SET progress
	public void setProgress(int progress) {
		this.progress = progress;
	}
	
	public void setProgressNumber(int progressNumber) {
		this.progressNumber = progressNumber;
	}

	
	//@return GET lastFeed
	public LocalDateTime getLastFeed() {
		return lastFeed;
	}

	
	//@param SET lastFeed
	public void setLastFeed() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		LocalDateTime localDateTime = LocalDateTime.from(formatter.parse(timestampString));
		
		lastLove = localDateTime;
	}

	
	//@return GET lastPlay
	public LocalDateTime getLastPlay() {
		return lastPlay;
	}

	
	//@param SET lastPlay
	public void setLastPlay() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		LocalDateTime localDateTime = LocalDateTime.from(formatter.parse(timestampString));
		
		lastPlay = localDateTime;
	}

	
	//@return GET lastLove
	public LocalDateTime getLastLove() {
		return lastLove;
	}

	
	//@param SET lastLove
	public void setLastLove() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String pattern = "MMM dd, yyyy HH:mm:ss.SSSSSSSS";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String timestampString = new SimpleDateFormat(pattern).format(timestamp);
		LocalDateTime localDateTime = LocalDateTime.from(formatter.parse(timestampString));
		
		lastLove = localDateTime;
	}

	
	//@param SET hunger
	public void setHunger(int hunger) {
		this.hunger = hunger;
	}

	
	//@param SET play
	public void setPlay(int play) {
		this.play = play;
	}

	
	//@param SET love
	public void setLove(int love) {
		this.love = love;
	}
	
	

	
	//@param SET minProgress
	public void setMinProgress(int minProgress) {
		this.minProgress = minProgress;
	}

	
	//@param SET maxProgress
	public void setMaxProgress(int maxProgress) {
		this.maxProgress = maxProgress;
	}

	
	//@return GET owner
	public String getOwner() {
		return owner;
	}

	
	//@param SET owner
	public void setOwner(String owner) {
		this.owner = owner;
	}

	@Override
	public String toString() {
		return "Pet [id=" + id + ", name=" + name + ", owner=" + owner + ", birthday=" + birthday + ", type=" + type
				+ ", gender=" + gender + ", stage=" + stage + ", growStage=" + growStage + ", color=" + color
				+ ", mood=" + mood + ", image=" + image + ", hunger=" + hunger + ", play=" + play + ", love=" + love
				+ ", progress=" + progress + ", percent=" + percent + ", minProgress=" + minProgress + ", maxProgress="
				+ maxProgress + ", progressNumber=" + progressNumber + ", age=" + age + ", lastFeed=" + lastFeed
				+ ", lastPlay=" + lastPlay + ", lastLove=" + lastLove + ", environment=" + environment + "]";
	}
	
	

}
