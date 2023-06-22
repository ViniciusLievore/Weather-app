import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Geo } from './models/geo.model';
import { Weather } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherObject: Weather = new Weather();
  geoObject: Geo = new Geo;

  textoLocal = '';
  textoMaxMin = '';

  searchText = '';
  isLoading = false;
  errorMessage = '';

  option!: EChartsOption;
  optionTemperature!: EChartsOption;
  optionWindSpeed!: EChartsOption;
  optionWindDirection!: EChartsOption;

  iconTest ='';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.pegarGeoLocation();
  }

  preencher_climaAgora() {
    this.textoLocal = this.weatherObject.cidade + "," + this.weatherObject.estado + ". " + this.weatherObject.pais;
  }

  gerarGrafico(hours: any, serie: any, title: string, name: string, type: number) {
    let option: EChartsOption = {
      title: {
        text: title,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: hours
      },
      yAxis: {
        type : 'value',
        name: name,
        nameLocation: 'middle',
        nameGap: 70,
        max: function (value) {
          return Math.trunc(value.max) + 1;
        },
        min: function (value) {
          return Math.trunc(value.min);
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        data: serie,
        type: 'line',
        label: {
          show: true
        }
      }]
    }

    if (type === 1) this.optionTemperature = option;
    if (type === 2) {
      this.optionWindDirection = option;
      this.optionWindDirection.yAxis = {
        type : 'value',
        name: 'Azimute (°)',
        nameLocation: 'middle',
        nameGap: 70,
        max: 360,
        min: 0,
        interval: 90
      }
    }
    if (type === 3) this.optionWindSpeed = option;
  }

  pegarPrevisaoHoraAHora(localCode: any) {
    this.weatherService.get12Hourly(localCode).subscribe((data: any) => {
      let horarios = [];
      let temperatures = [];
      let wind_speed = [];
      let wind_direction = [];

      for (let a of data) {
        let hora = new Date(a.DateTime).getHours();
        horarios.push(`${String(hora)}h`);
        temperatures.push(a.Temperature.Value);
        wind_speed.push(a.Wind.Speed.Value);
        wind_direction.push(a.Wind.Direction.Degrees);
      }

      this.gerarGrafico(horarios, temperatures, 'Temperatura Hora a Hora', 'Temperatura (°C)', 1);
      this.gerarGrafico(horarios, wind_direction, 'Direção Do Vento Hora a Hora', 'Azimute (°)', 2);
      this.gerarGrafico(horarios, wind_speed, 'Velocidade Do Vento Hora a Hora', 'm/s', 3);
    });
  }

  preencherPrevisao5Dias(previsoes: any) {
    let elementoHTMLDia = '';
    document.querySelector('#info_5dias')!.innerHTML = elementoHTMLDia;

    let diasSemanas = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"];

    for (let a of previsoes) {
      let dataHoje = new Date(a.Date);
      const dia_semana = diasSemanas[dataHoje.getDay()];
      const iconNumber = a.Day.Icon <= 9 ? "0" + String(a.Day.Icon) : String(a.Day.Icon);

      const icone = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
      this.iconTest = icone;
      const maxima = String(a.Temperature.Maximum.Value);
      const minima = String(a.Temperature.Minimum.Value);

      elementoHTMLDia = '<div class="day col">';
      elementoHTMLDia += '<div class="day_inner">';
      elementoHTMLDia += '<div class="dayname">';
      elementoHTMLDia += dia_semana;
      elementoHTMLDia += '</div>';
      elementoHTMLDia += '<div class="daily_weather_icon"></div>';
      elementoHTMLDia += '<img src=\"' + icone + '\">';
      elementoHTMLDia += '<div class="max_min_temp">';
      elementoHTMLDia += minima + '&deg;C / ' + maxima + '&deg;C';
      elementoHTMLDia += '</div>';
      elementoHTMLDia += '</div>';
      elementoHTMLDia += '</div>';

      document.querySelector('#info_5dias')!.innerHTML += elementoHTMLDia;
      elementoHTMLDia = "";
    }
  }

  pegarPrevisao5Dias(localCode: any) {
    this.weatherService.get5DayForecast(localCode).subscribe((data: any) => {
      this.textoMaxMin = String(data.DailyForecasts[0].Temperature.Minimum.Value) + String.fromCharCode(176) + "C" + " / " + String(data.DailyForecasts[0].Temperature.Maximum.Value + String.fromCharCode(176) + "C");

      this.preencherPrevisao5Dias(data.DailyForecasts);
    });
  }

  pegarTempoAtual(localCode: any) {
    this.weatherService.getCurrentConditions(localCode).subscribe((data: any) => {
      this.weatherObject.temperatura = data[0].Temperature.Metric.Value;
      this.weatherObject.textoClima = data[0].WeatherText;

      let iconNumber = data[0].WeatherIcon <= 9 ? "0" + String(data[0].WeatherIcon) : String(data[0].WeatherIcon);

      this.weatherObject.icone = "https://developer.accuweather.com/sites/default/files/" + iconNumber + "-s.png";

      this.preencher_climaAgora();
      console.log('icon', iconNumber);

    });
  }

  pegarLocalUsuario(lat: string, long: string) {
    this.weatherService.getGeoPosition(lat, long).subscribe((data: any) => {
      try {
        this.weatherObject.cidade = data.ParentCity.LocalizedName;
      }
      catch {
        this.weatherObject.cidade = data.LocalizedName;
      }

      this.weatherObject.estado = data.AdministrativeArea.LocalizedName;
      this.weatherObject.pais = data.Country.LocalizedName;

      let localCode = data.Key;
      console.log('data', data);
      this.pegarTempoAtual(localCode);
      this.pegarPrevisao5Dias(localCode);
      this.pegarPrevisaoHoraAHora(localCode);
    });
  }

  pegarCoordenadasPesquisa(input: string) {
    this.isLoading = true;
    input = encodeURI(input);

    this.weatherService.getCoordinates(input).subscribe((data: any) => {
      try {
        let long = data.features[0].geometry.coordinates[0];
        let lat = data.features[0].geometry.coordinates[1];
      console.log('lat', lat);
      console.log('long', long);

        this.pegarLocalUsuario(lat, long)
      }
      catch {
        this.gerarErro("Erro na pesquisa do Local");
      }
    });

    this.isLoading = false;
  }

  pegarGeoLocation() {
    let lat_padrao = "-23.4262";
    let long_padrao = "-51.9388";

    this.weatherService.getGeoLocation().subscribe(data => {
      this.geoObject = data;
      let lat = this.geoObject.geoplugin_latitude;
      let long = this.geoObject.geoplugin_longitude;

      if (lat && long) {
        this.pegarLocalUsuario(lat, long);
      } else {
        this.pegarLocalUsuario(lat_padrao, long_padrao);
      }
    });
  }

  gerarErro(mensagem: any): void {
    if (!mensagem) {
      mensagem = "Erro na solicitação";
    }

    this.errorMessage = mensagem;
  }

}
