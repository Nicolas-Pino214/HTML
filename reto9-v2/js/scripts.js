//Configuracion de Supabase
const Supabase_url= 'https://ciewnfyaimlrsxynktee.supabase.co';
const supabase_anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXduZnlhaW1scnN4eW5rdGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTA2MTIsImV4cCI6MjA2OTQ2NjYxMn0.gZ9NeBq6NF3Lp8JhqB15vMl5cM5oh0-ddZNMtLOMDGg';

const supabase = window.supabase.createClient(Supabase_url, supabase_anon_key);

document.addEventListener ('DOMContentLoaded', async function() {
    //Autenticación Anónima
    await supabase.auth.signInAnonymously();

    //Ejecutar todas las funciones
    fetchTop20Paises();
    fetchTopRegiones();
    fetchColombiaVsSuramerica();

    //Gráfico de Barras de Top 20 Países con mayor producción de energía renovable
    async function fetchTop20Paises(){
        const { data, error } = await supabase
            .from('top_20_paises')
            .select('*')
            .order('promedio_renovables', {ascending: false})
            .limit(20);

     if(error) throw error;

        createBarChart('graficoBarrasPaises', data, 'pais', 'promedio_renovables', 'Porcentaje de Energía Renovable', 'rgba(54, 162, 235, 0.6)')
    }
        
    //gráfico de  Barras de produccion de energia renovable por regiones
    async function fetchTopRegiones(){
        const { data, error } = await supabase
        .from('top_regiones')
        .select('*')
        .order('promedio_renovables', {ascending: false});

        if(error) throw error;

        createBarChart('graficoBarrasRegiones', data, 'region', 'promedio_renovables', 'Porcentaje de Energía Renovable por Región', 'rgba(90, 126, 114, 0.6)')
    }

    //Funcion para crear gráfico de barras
    function createBarChart(canvasId, data, labelField, datafield, label, backgroundColor) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
             data: {
                    labels: data.map(item => item[labelField]),
                    datasets: [{
                        label: label,
                        data: data.map(item => item[datafield]),
                        backgroundColor: backgroundColor,
                        borderColor: backgroundColor.replace('0.6','1'),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
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
                                text:canvasId.includes('Paises') ? 'Paises' : 'Regiones'
                            }
                        }
                    }
                } 
        });
    }
    
    //Gráfico Comparativo de Líneas
    async function fetchColombiaVsSuramerica() {
         const { data, error } = await supabase
        .from('colombia_suramerica')
        .select('*')
        .lte('anno', 2021)
        .order('anno', {ascending: true});

        if(error) throw error;

        //Procesar los datos que vienen de la consulta
        const colombiaData = data.filter(item => item.region === 'Colombia');
        const suramericaData = data.filter(item => item.region === 'South America');
        const years = [...new Set (data.map(item => item.anno))];

        const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
            new Chart(ctx,{
                type: 'line',
                data: {
                    labels:years,
                    datasets: [
                        {
                            label:'Colombia',
                            data: colombiaData.map(item => item.renovables),
                            borderColor:'rgba(255, 99,132, 1)',
                            backgroundColor: 'rgba(255, 9, 63,0.2)',
                            fill: false,
                            borderWidth:1,
                            tension: 0.2,

                        },
                        {
                            label:'South America',
                            data: suramericaData.map(item => item.renovables),
                            borderColor:'rgba(15, 52, 2, 0.84)',
                            backgroundColor: 'rgba(55, 223, 29, 1)',
                            fill: false,
                            borderWidth:1,
                            tension: 0.2,

                        }
                    ]
                }
            })
    }
});