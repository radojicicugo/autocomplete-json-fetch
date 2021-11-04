
const search = document.getElementById('search');
const matchList = document.getElementById('match-list')


  const getDataFetch = async searchText => {
    const res = await fetch("../data/podaci_json.json");
    const states = await res.json()

   //text input
   let matches = states.filter(state => {
       const regex = new RegExp(`^${searchText}`, "gi")
       return state.name.match(regex) || state.abbr.match(regex);

   });
      if(searchText.length === 0){
          matches = [];
          matchList.innerHTML = '';
      }
      outpuHtml(matches);
  };


  //show result Html
  const outpuHtml = matches => {
      if(matches.length > 0){
       const html = matches.map(match => `
       <div class="card card-body md-1">
          <div>${match.name}</div>
          <span class="text-primary">${match.abbr}</span>
          <div>${match.capital}</div>
          <span>${match.lat} / Long:
          ${match.long}</span>
          </div>
       `)
       .join("");

       matchList.innerHTML = html;

      }
  }
 

search.addEventListener('input', () => getDataFetch(search.value));