/*
	window.innerHeight - np:700px wysokość wyświetlacza/okna
	document.body.offsetHeight - np:1159px jest to wysokość zawartości strony
	window.scrollY - sprawdza, czy zaistniało przesunięcie
	
	wzór:
	window.scrollY + window.innerHeight >= document.body.offsetHeight
	czyli, np: 20 + 700 >= da nam false
*/

class InfiniteScroll {
	constructor(container, loader){
		this.container = container;
		this.loader = loader;
		this.loading = false;
		this.page = 1;
		this.init();
	}
	
	init() {
		window.onload = this.getData; // Pamiętaj aby nie wywoływać funkcji getData poprzez (), bo onload sam ją wywoła po wczytaniu wszystkiego.
		window.addEventListener("scroll", () => {
			// console.log(Math.floor(window.scrollY));
			// console.log(window.scrollY.toFixed(1)); // toFixed(1) - ogranicz wyniki do jednego miejsca po przecinku
			
			if(this.loading) return;
			if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
				this.setLoading(true);
				this.getData();
			}
		});
	}
	
	setLoading(flag) {
		if(flag) {
			this.loader.classList.remove("hidden");
		} else {
			this.loader.classList.add("hidden");
		}
		
		this.loading = flag;
	}
	
	getData = async () => {
		console.log("getData")
		const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=4`;
		try {
			const res = await fetch(apiUrl);
			const photosArray = await res.json();
			this.displayPosts(photosArray);
		} catch (err) {
			console.log(err);
		}
		this.page++;
		this.setLoading(false);
	}
	
	displayPosts(posts){
		this.container.innerHTML += posts.map(post => {
			 // console.log(post);
			return `
				<div class="post">
					<h3>${this.capitalizeFirstLetter(post.title)}</h3>
					<p>${this.capitalizeFirstLetter(post.body)}</p>
				</div>
			`;
		}).join("");
	}
	
	capitalizeFirstLetter(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}

const isScroll = new InfiniteScroll(document.querySelector(".container"), document.querySelector('.loader-box'));