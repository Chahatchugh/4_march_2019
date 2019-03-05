function dataFetch() {
    $(document).ready(function(){
    const Url='https://jsonplaceholder.typicode.com/posts';
        $.ajax({
            url : Url,
            type : "GET",
            success: function(result){
                Information(result)
        },
        error: function(error){
        console.log(`Error ${error}`)
        }
    })
  })
}

function Information(data) {
    keys = Object.keys(data[1])

    values = data.map((elemen,index)=>{
        return Object.values(data[index])
    })

    var text = []
    var td = []
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    table.appendChild(thead)

    for (var i = 0 ; i < keys.length; i++)
    {
        thead.appendChild(document.createElement("th")).appendChild(document.createTextNode(keys[i]))
    }

    for (var i = 0 ; i < values.length; i++)
    {
        var tr = document.createElement('tr'); 
            for (var j = 0 ; j < keys.length; j++)  
            {
                td[j] = document.createElement('td');
                text[j]= document.createTextNode(values[i][j]);
                td[j].appendChild(text[j]);
                tr.appendChild(td[j]);
            }
    table.appendChild(tr);
    }

document.body.appendChild(table);
table.setAttribute("border", "2");


const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));
}
