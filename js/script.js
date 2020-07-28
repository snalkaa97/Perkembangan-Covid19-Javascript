$('#indo').html('');


$('.nav-link').on('click', function () {
  $('.nav-link').removeClass('active');
  $(this).addClass('active');

})

function indonesia() {
  $.ajax({
    url: 'https://covid19-live-api.herokuapp.com/getNationalSummary',
    dataType: 'json',
    type: 'get',
    success: function (data) {
      // console.log(data)
      $('#nasionalPositif').html(`
        <h5>` + new Intl.NumberFormat(['ban', 'id']).format(data.positive) + `</h5>
        `)
      $('#nasionalPerawatan').html(`
        <h5>` + new Intl.NumberFormat(['ban', 'id']).format(data.inCare) + `</h5>
        `)
      $('#nasionalSembuh').html(`
        <h5>` + new Intl.NumberFormat(['ban', 'id']).format(data.recovered) + `</h5>
        `)
      //console.log(data.recovered);
      $('#nasionalMeninggal').html(`
        <h5>` + new Intl.NumberFormat(['ban', 'id']).format(data.died) + `</h5>
        `)
    }
  })
}

indonesia();

$('#global').on('click', function () {
  $('#indo_dashboard').html('');
  $('#tabel-indo').html('');
  $('#chart-indo').html('');
  $('#global-dashboard').html(`
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-sm-4 mt-3">
          <div class="card text-white bg-danger">
            <div class="card-header" id="globalPositif"></div>
            <div class="card-body">
              <h5 class="card-title">Positif</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-4 mt-3">
          <div class="card text-white bg-success">
            <div class="card-header" id="globalSembuh"></div>
            <div class="card-body">
              <h5 class="card-title">Sembuh</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-4 mt-3">
          <div class="card text-white bg-info">
            <div class="card-header" id="globalMeninggal"></div>
            <div class="card-body">
              <h5 class="card-title">Meninggal</h5>
            </div>
          </div>
        </div>
      </div>

      <table class="table table-borderless mt-5" id="tabel2">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Negara</th>
      <th scope="col">Positif</th>
      <th scope="col">Kasus Aktif</th>
      <th scope="col">Sembuh</th>
      <th scope="col">Meninggal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    </tr>
  </tbody>
</table>
    </div>

    
    `)
    $('#navigasi').html('');

  $.getJSON('https://api.kawalcorona.com/positif', function (data) {
    // console.log(data.value)
    $('#globalPositif').html(`
        <h5>` + data.value + `</h5>
        `)

  })
  $.getJSON('https://api.kawalcorona.com/sembuh', function (data) {
    //console.log(data.value)
    $('#globalSembuh').html(`
        <h5>` + data.value + `</h5>
        `)

  })
  $.getJSON('https://api.kawalcorona.com/meninggal', function (data) {
    // console.log(data.value)
    $('#globalMeninggal').html(`
        <h5>` + data.value + `</h5>
        `)

    $.ajax({
      url: 'https://api.kawalcorona.com',
      dataType: 'json',
      type: 'get',
      success: function (result) {
        //console.log(data);
        let no = 1;
        $.each(result, function (i, data) {
          $('#tabel2 tr:last').after(`
          <tr>
            <td>` + no + `</td>
            <td>` + data.attributes.Country_Region + `</td>
            <td>` + new Intl.NumberFormat(['ban', 'id']).format(data.attributes.Confirmed) + `</td>
            <td>` + new Intl.NumberFormat(['ban', 'id']).format(data.attributes.Active) + `</td>
            <td>` + new Intl.NumberFormat(['ban', 'id']).format(data.attributes.Recovered) + `</td>
            <td>` + new Intl.NumberFormat(['ban', 'id']).format(data.attributes.Deaths) + `</td>
          </tr>
          `)
          no++;
        })
      }
    })


  })
})

$('#indonesia').on('click', function () {
  $('#global-dashboard').html('')
  $('#indo_dashboard').html(`
    <div class="container">
      <div class="row">
        <div class="col-lg-3 mt-3">
          <div class="card text-white bg-danger">
            <div class="card-header" id="nasionalPositif"></div>
            <div class="card-body">
              <h5 class="card-title">Positif (Indonesia)</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mt-3">
          <div class="card text-white bg-warning">
            <div class="card-header" id="nasionalPerawatan"></div>
            <div class="card-body">
              <h5 class="card-title">Dalam Perawatan (Indonesia)</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mt-3">
          <div class="card text-white bg-success">
            <div class="card-header" id="nasionalSembuh"></div>
            <div class="card-body">
              <h5 class="card-title">Sembuh (Indonesia)</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mt-3">
          <div class="card text-white bg-info">
            <div class="card-header" id="nasionalMeninggal"></div>
            <div class="card-body">
              <h5 class="card-title">Meninggal (Indonesia)</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    `)

$('#navigasi').html(`
    <ul class="nav nav-pills">
    <li class="nav-item">
        <a class="nav-link active" href="#chart-indo">Chart</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#tabel1">Tabel</a>
      </li>
      
    </ul>
`)

  indonesia();

   $('#chart-indo').html(`
    <canvas id="myChart"></canvas>
  `)

  chartIndo();

  $('#tabel-indo').html(`
  <div class="container mt-5">
  <table class="table table-striped table-bordered table-hover" id="tabel1" cellspacing="0" width="100%">
    <thead>
      <tr>
        <th>No</th>
        <th>Provinsi</th>
        <th>Positif</th>
        <th>Sembuh</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>
  `)
  tabel();
  
 



})


function tabel() {
  $.ajax({
    url: 'https://api.kawalcorona.com/indonesia/provinsi',
    dataType: 'json',
    type: 'get',
    success: function (result) {
      //console.log(result);
      let no = 1
      $.each(result, function (i, hasil) {
        //console.log(data.attributes.Provinsi)
        $('#tabel1 tr:last').after(`
              <tr>
                      <td>` + no + `</td>
                      <td>` + hasil.attributes.Provinsi + `</td>
                      <td>` + new Intl.NumberFormat(['ban', 'id']).format(hasil.attributes.Kasus_Posi) + `</td>
                      <td>` + new Intl.NumberFormat(['ban', 'id']).format(hasil.attributes.Kasus_Semb) + `</td>
              </tr>
              `);

        no++

      })
    }
  })
}
tabel();

function chartIndo(){
$.ajax({
  url: 'https://api.kawalcorona.com/indonesia/provinsi',
  dataType: 'json',
  type: 'get',
  success: function (result) {

    var labels = result.map(function (e) {
      return e.attributes.Provinsi;
    })

    var data = result.map(function(e) {
      return e.attributes.Kasus_Posi;
    })
    console.log(labels)
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: labels,
        datasets: [{
          label: 'Provinsi',
          backgroundColor: 'rgb(102, 0, 102)',
          borderColor: 'rgb(102, 0, 102)',
          data: data
        }]
      },

      // Configuration options go here
      options: {}
    });
  }
})
}

chartIndo();