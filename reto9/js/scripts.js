document.addEventListener ('DOMContentLoaded', function(){
    //GráficodeBarras deTop 20 Paises con mayor 
    fetch('data/top20Paises.json')
        .then(response => response.json())
        .then(data =>{
            const ctx = document.getElementById('graficoBarrasPaises').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.Pais),
                    datasets: [{
                        label: 'Porcentaje de Energia Renovable',
                        data: data.map(item => item['Promedio Renovables']),
                        backgroundColor: 'rgba(54,162, 235, 0.6)',
                        borderColor: 'rgba(54,165, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive:true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title:{
                                display: true,
                                text: 'Porcentaje(%)'
                            }
                        },
                        x: {
                            title: {
                                display:true,
                                text:'Paises'
                            }
                        }
                    }
                } 
            });
        });
        
        //gráficode  Barras de produccion de energia renovable por regiones//
        fetch('data/topRegiones.json')
        .then(response => response.json())
        .then(data =>{
            const ctx = document.getElementById('graficoBarrasRegiones').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.Region),
                    datasets: [{
                        label: 'Porcentaje de Energia Renovable',
                        data: data.map(item => item['Promedio Renovables']),
                        backgroundColor: 'rgba(255, 0, 0, 0.81)',
                        borderColor: 'rgba(54,165, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive:true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title:{
                                display: true,
                                text: 'Porcentaje(%)'
                            }
                        },
                        x: {
                            title: {
                                display:true,
                                text:'Regiones'
                            }
                        }
                    }
                } 
            });
        });

        //grafico de lineas comparativos//
        fetch('data/colombia_SurAmerica.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => item.Anno <= 2021);
            const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
            new Chart(ctx,{
                type: 'line',
                data: {
                    labels:[...new Set(filteredData.map(item => item.Anno))],
                    datasets: [
                        {
                            label:'Colombia',
                            data: filteredData.filter(item => item.Region === 'Colombia').map(item => item.Renovable),
                            borderColor:'rgba(255, 99,132, 1)',
                            backgroundColor: 'rgba(255, 9, 63,0.2)',
                            fill: false,
                            borderWidth:1,
                            tension: 0.2,

                        },
                        {
                            label:'Suramérica',
                            data: filteredData.filter(item => item.Region === 'Suramerica').map(item => item.Renovable),
                            borderColor:'rgba(15, 52, 2, 0.84)',
                            backgroundColor: 'rgba(55, 223, 29, 1)',
                            fill: false,
                            borderWidth:1,
                            tension: 0.2,

                        }
                    ]
                }
            })
        })
        

        
});