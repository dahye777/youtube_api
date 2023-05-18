// key : AIzaSyDYmRmEk57NgB52BHhD2CsG4txnXnCoO-g
// list : PLPgEk2lIO0kndkc4AYMAl3ECp-xk1Y5rg

let key = 'AIzaSyDYmRmEk57NgB52BHhD2CsG4txnXnCoO-g';
let list = 'PLPgEk2lIO0kndkc4AYMAl3ECp-xk1Y5rg';

let main = document.querySelector("main");

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}`; 
//?는 연결한다는 뜻 and(&) 같은

fetch(url)
    .then((data) => {
        // console.log(data);
        return data.json();
    })

    .then((json) => {
        console.log(json);
        let items = json.items
        console.log(items);


        let result = "";

        items.map((el)=>{
            result += `
            <article>
                <a href="${el.snippet.resourceId.videoId}">
                    <img src="${el.snippet.thumbnails.medium.url}">
                </a>
                <h1>${el.snippet.title}</h1>
            </article>`;
            // a += c   ==   a = a + c 
        });
        main.innerHTML = result;
    })

    main.addEventListener("click", (e)=>{
        e.preventDefault();

        // currentTarget을 쓰면 안됩니다 : main에 이벤트위임으로 안의 article들에 클릭이벤트가 부여되도록
        // 하기 때문에 currentTarget은 main입니다. target은 article을 말합니다
        let vidId = e.target.closest("article").querySelector("a").getAttribute("href");

        let pop = document.createElement("figure");
        pop.innerHTML = `
        <iframe src="http://www.youtube.com/embed/${vidId}">
        `;
        main.append(pop);

        
    });