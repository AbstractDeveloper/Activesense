const Sensor_URL = 'http://localhost:5003/send-data';

$('#loginbutton').on('click', () => {
  const username = $('#username').val();
  const password = $('#password').val();

  const body = {
    username,
    password
  }
  $.post(`${Sensor_URL}/sensor-data`, body)
    .then(response => {
      location.href = 'main.html';
    })
});

$.get(`${Sensor_URL}/sensor-data`)
  .then(response => {
    response.forEach(device => {
      $('#send-sensordata tbody').append(`
          <tr>
            <td>${device.data}</td>
            <td>${device.date}</td>
            <td>${device.loadcelldata}</td>
          </tr>`
      );

    });
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });

let yArray = [];
let xArray = [];

$.get(`${Sensor_URL}/sensor-data`)
  .then(response => {
    response.forEach(device => {
      // yArray.push(device.data);
      // xArray.push(device.loadcelldata);
    });

    Highcharts.chart('my-plot', {
      title: {
        text: ''
      },
      xAxis: {
        title: {
          text: ''
        },
        categories: xArray
      },
      yAxis: {
        title: {
          text: ''
        },
      },
      series: [{
        name: 'Our Project Data',
        data: yArray
      }]
    });
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });