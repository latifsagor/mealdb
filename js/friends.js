const loadFriends = () => {
    fetch('https://randomuser.me/api/?results=5')
    .then(res => res.json())
    .then(data => displayFriends(data))
};

loadFriends();

const displayFriends = (data) => {
    const friends = data.results;
    const friendsDiv = document.getElementById('friends');
    for(const friend of friends){
        console.log(friend);
        const p = document.createElement('p');
        p.innerText = `Name: ${friend.name.title} ${friend.name.first} ${friend.name.last} ${friend.email}`;
        friendsDiv.appendChild(p);
    };
};