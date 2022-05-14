class InfiniteScroll {
	constructor(container){
		this.container = container;
		this.init();
	}
	
	init() {
		window.onload = this.getData; // Pamiętaj aby nie wywoływać funkcji getData poprzez (), bo onload sam ją wywoła po wczytaniu wszystkiego.
	}
	
	getData = async () => {
		const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=4`;
		try {
			const res = await fetch(apiUrl);
			const photosArray = await res.json();
			this.displayPosts(photosArray);
		} catch (err) {
			console.log(err);
		}
	}
	
	displayPosts(posts){
		this.container.innerHTML += posts.map(post => {
			 console.log(post);
			return `
				<div class="post">
					<h3>${post.title}</h3>
					<p>${post.body}</p>
				</div>
			`;
		}).join("");
	}
}

const isScroll = new InfiniteScroll(document.querySelector(".container"));