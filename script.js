var data = [];
var index = 0;


document.querySelector('#fileInput').addEventListener('change',function(event){
	var files = event.target.files;

	for(var i =0; i< files.length; i++){
		var file = files[i];
		if(file){
			var imageUrl = URL.createObjectURL(file)
	        console.log(imageUrl)
	        var contenteditable = document.querySelector('[contenteditable]');
	        
		    var img = document.createElement('img');
		    img.src = imageUrl;
		    contenteditable.appendChild(img);
	    }
	}
})

function tweetSender(){
	// document.querySelector('.tweet-sender') .addEventListener('click', function(){
	var contenteditable = document.querySelector('[contenteditable]')
    var value = contenteditable.textContent
	var imagesource = [];
	var images = contenteditable.querySelectorAll('img')
	images.forEach(function(image){
		imagesource.push(image.src)
	})
	// var imagesource = document.querySelector('[contenteditable]').querySelector('img').src
    console.log(imagesource);

	var clutterobject = {
		index : index,
		value : value,
		image : imagesource
	}
			
    data.push(clutterobject)
	console.log(data)
	index++;
    
	documentPresenter();
	contenteditable.innerHTML = '';

// })
}
// tweetSender();

function documentPresenter(){
	var clutter = '';
	data.forEach(function(prop){
	clutter += `<div id="part-2-4">
					<div id="left">
						<div id="main-profile-icon-1-1">
							<img src="user_552721.png" alt="user">
						</div>
					</div>
					<div id="right">
						<div id="section-1">
							<h3>Username</h3>
							<h4>@username123</h4>
							<div id="arrow-down-icon">
								<i class="ri-arrow-down-s-line"></i>
							</div>
						</div>
						<div id="section-2">
							<h2>${prop.value}</h2>
							${prop.image.map(src => `<img src="${src}" alt="">`)}
						</div>
						<div id="section-3">
							<div id="comment-icon">
								<i class="ri-chat-1-line"></i>
							</div>
							<div id="retweet-icon">
								<img src="loop-arrow_10728935.png" alt="retweet">
							</div>
							<div id="love-icon">
								<i class="ri-heart-line"></i>
							</div>
							<div id="download-icon">
								<i class="ri-download-2-line"></i>
							</div>
						</div>
					</div>
				</div>`;

	document.querySelector('#part-2-4-main').innerHTML = clutter;
	console.log(clutter);			
});
}

// ----------------------------------------(fetching-emoji-data)-----------------------------

// for searching emoji

document.querySelector('#input-container-emoji').addEventListener('keyup', function(event){
	document.querySelectorAll('#emoji-container li').forEach(function(emoji) {
		if(emoji.getAttribute('emoji-name').toLowerCase().includes(event.target.value)){
			emoji.style.display = 'flex';
		}else{
			emoji.style.display = 'none';
		}
	})
})

// emoji-box activating function

document.querySelector('.ri-emotion-happy-line').addEventListener('click', function(){
	var emoji_box = document.getElementById('emoji-box');
	if(emoji_box.classList.contains('active')){
		emoji_box.classList.remove("active");
	}else{
		emoji_box.classList.add("active");
	}
})

// for fetching emoji-api

fetch('https://emoji-api.com/emojis?access_key=e73619440863a73cf2b27bda177280aff18d1ca7')
.then(response => response.json())
.then(data => ShowtheData(data))

function ShowtheData(data,index){
	var index = 0;
	data.forEach(function(emoji){
		var li = document.createElement('li');
		li.setAttribute('index', index);
		li.setAttribute('emoji-name', emoji.slug);
		li.textContent = emoji.character;
		document.getElementById('emoji-container').appendChild(li);
		index++;
	})
}

// Added emojis to the textarea

document.querySelector('#emoji-container').addEventListener('click', function(event){
	if(event.target.tagName === 'LI'){
		var contenteditable = document.querySelector('[contenteditable]');
		contenteditable.append(event.target.textContent);
		console.log(event.target.textContent)
	}
})

// ----------------------------------------(fetching-gif-data)-----------------------------

// for searching gif

document.querySelector('#input-container-gif').addEventListener('keyup', function(event){
	document.querySelectorAll('#gif-container li').forEach(function(gif) {
		if(gif.getAttribute('gif-name').toLowerCase().includes(event.target.value)){
			gif.style.display = 'flex';
		}else{
			gif.style.display = 'none';
		}
	})
})

// gif-box activating function

document.querySelector('.ri-file-gif-line').addEventListener('click', function(){
	var gif_box = document.getElementById('gif-box');
	if(gif_box.classList.contains('active')){
		gif_box.classList.remove("active");
	}else{
		gif_box.classList.add("active");
	}
})

// for fetching gif-api

fetch('https://g.tenor.com/v1/search?q=excited&key=LIVDSRZULELA&limit=8')
.then(response => response.json())
.then(data => ShowtheGIF(data.results))

function ShowtheGIF(GIFs){
	var index = 0;
	GIFs.forEach(function(gif){
		var li = document.createElement('li');
		var img = document.createElement('img');
		li.setAttribute('gif-name', gif.content_description)
		img.src = gif.media[0].nanogif.url;
		li.appendChild(img);
		document.getElementById('gif-container').appendChild(li);
		index++;
	})
}

// Added gifs to the textarea

document.querySelector('#gif-container').addEventListener('click', function(event){
	if(event.target.tagName === 'IMG'){
			var contenteditable = document.querySelector('[contenteditable]');
			var text = contenteditable.textContent;
			console.log(text)
			var img = document.createElement('img')
			img.src = event.target.src;
			contenteditable.appendChild(img);
		    console.log(event.target.textContent)
		
	}
})

// ----------------------------------------trends(show-more-effect)--------------------------------

function ShowmoreTrends(name){
	console.log("got the command")
	event.currentTarget.classList.add("activated");
	var elements = document.querySelectorAll('[id^="' + name + '"]');
	elements.forEach(function(elememt){
		elememt.classList.add("active");
	})
}


// ----------------------------------------followers(show-more-effect)--------------------------------

function ShowmoreFollowers(name, removeID){
	// event.currentTarget.classList.add("activated");
	event.currentTarget.classList.add("activated");
	var elements = document.querySelectorAll('[id^="' + name + '"]');
	elements.forEach(function(elememt){
		elememt.classList.add("active");
	})
	var IDsNeedtobeRemoved = document.querySelectorAll('[id^="' + removeID + '"]');
	IDsNeedtobeRemoved.forEach(function(ID){	
		ID.removeAttribute('id');
	})
}
