let posts = [
    {
        'profilePic': 'img/profile1.jpg',
        'name': '<b>Elvira</b>',
        'image': 'img/cat.jpg',
        'likes': 328,
        'isLiked': false,
        'message': '<b>Elvira</b> Unser neues Familienmitglied. #kitty #mybaby #family',
        'comment': ['<b>Holly</b> Ist die süß!', '<b>Kassandra</b> Sieht aus wie mein Salem.']
    },
    {
        'profilePic': 'img/profile2.jpg',
        'name': '<b>Holly</b>',
        'image': 'img/witchDance.jpg',
        'likes': 463,
        'isLiked': false,
        'message': '<b>Holly</b> Richtig gute Stimmung hier! #DancingQueen #party #TanzderTeufel',
        'comment': ['<b>Elvira</b> Da bekommt man richtig Laune!', '<b>Kassandra</b> Nice, ich treff dich dort!', '<b>Walpurga</b> Die Jugend heutzutage...']
    },
    {
        'profilePic': 'img/profile3.jpg',
        'name': '<b>Kassandra</b>',
        'image': 'img/incantation.jpg',
        'likes': 390,
        'isLiked': false,
        'message': '<b>Kassandra</b> Zeit fürs alljährliche Familientreffen. #family #Zusammensein #Geisterstunde',
        'comment': ['<b>Holly</b> So eine Zusammenkunft ist immer was Schönes!', '<b>Elvira</b> Viele Grüße von mir!']
    },
    {
        'profilePic': 'img/profile4.jpg',
        'name': '<b>Walpurga</b>',
        'image': 'img/potion.jpg',
        'likes': 2,
        'isLiked': false,
        'message': '<b>Walpurga</b> Vorbereitung für Halloween - dieses Jahr gibts nur Saures haha. #WasIstEinHashtag',
        'comment': ['<b>Kassandra</b> wtf', '<b>Elvira</b> Also in dem Zirkel kann echt jeder machen was er will.', '<b>Holly</b> Oma, bitte ned schon wieder...']
    },
];


load();


function loadPosts() {
    document.getElementById('content').innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        document.getElementById('content').innerHTML += postTemplate(post, i);

        let comment = document.getElementById(`comment${i}`);

        for (let j = 0; j < post['comment'].length; j++) {
            const oneComment = post['comment'][j];
            comment.innerHTML += `
            <div class="comments">${oneComment}</div>
            `;
        }
    }
}


function postTemplate(post, i) {
    return `
        <div class="completePost">
            <div class="profile">
                <img class="profilePic" src="${post['profilePic']}">
                <div>${post['name']}</div>
            </div>

            <img class="postImage" src="${post['image']}">

            <div class="textContainer">
                <div class="instaSymbols">
                    <img id="heart${i}" class="isLiked-${post['isLiked']}" onclick="like(${i})">
                    <img onclick="inactiveButtons()" class="instaImg" src="./img/instaSpeech.png" alt="Sprechblase">
                    <img onclick="inactiveButtons()" class="instaImg" src="./img/instaKite.png" alt="Papierflieger">
                    <img onclick="inactiveButtons()" class="instaImg instaMark" src="./img/instaMark.png" alt="Markierung">
                </div>

                <div class="likeContainer">
                    <b><p>Gefällt</p></b>
                    <b><div id="likes${i}" class="marginLeft">${post['likes']}</div></b>
                    <b><p class="marginLeft">Mal</p></b>
                </div>

                <div class="messageContainer">${post['message']}</div>

                <div class="seperator"></div>

                <div class="commentContainer" id="comment${i}"></div>

                <div class="postCommentConainer">
                    <input id="inputComment${i}" class="inputField" type="text" placeholder="Kommentar..." onkeydown = "if (event.keyCode == 13) document.getElementById('commentBtn${i}').click()">
                    <button id="commentBtn${i}" onclick="addComment(${i})" class="commentButton">Posten</button>
                </div>
            </div>
        </div>
        `;
}


function addComment(index) {
    let input = document.getElementById(`inputComment${index}`).value;
    let newComment = "<b>Besen Hilda</b>" + input;

    if (input == "") {
        alert("Bitte Zauberspruch eingeben!");
    } else {
        posts[index]['comment'].push(newComment);
    }

    loadPosts();
    save();
}


function like(i) {
    posts[i]['isLiked'] = !posts[i]['isLiked'];

    if (posts[i]['isLiked']) {
        posts[i]['likes']++;
    } else {
        posts[i]['likes']--;
    }

    loadPosts();
    save();
}


function inactiveButtons() {
    alert("Hoppla! Dieser Button scheint verhext zu sein...")
}


function save() {
    localStorage.setItem('posts', JSON.stringify(posts));
}


function load() {
    let savedArrays = localStorage.getItem('posts');

    if (savedArrays) {
        posts = JSON.parse(savedArrays);
    }
}