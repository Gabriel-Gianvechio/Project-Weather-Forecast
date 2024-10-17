
document.querySelector('.busca').addEventListener('submit', async (event) => { //SUBMIT é o evento que ocorre quando ENVIAMOS um formulario (classe .buscar está dentro de um form com um button)
    event.preventDefault(); // essa função EVITA/PREVINE o comportamento padrão (que é enviar o formulario)

    let input = document.querySelector('#searchInput').value; //peguei o valor que foi digitado no input que temos

    // console.log(input); // para ver se estamos pegando o valor que queremos

    if (input !== ''){
        clearInfo();
        showWarning(`Procurando...`);

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=89d2c2afa87413af68b4e21b68155ca9&units=metric&lang=pt_br`;
        //encodeURI serve para transformar o texto digitado no campo input em um formato CORRETO para URL (substituindo assentos, espaço, etc)
        let results = await fetch(url);
        let json = await results.json();
        //console.log(json); //conferir se está tudo certo

        if(json.cod === 200) { //codigo 200 é de quando deu certo a requisição para a API
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon, //weather é um array
                windSpeed: json.wind.speed,
                windAng: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos está localização.');
        }     
    } else {
        clearInfo();
    }

});

function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup> ºC </sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    //a URL que o API fornece o icone é essa, variando apenas aquela parte onde está o JSON com a imagem correta.

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAng-90}deg   )`;
    
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}