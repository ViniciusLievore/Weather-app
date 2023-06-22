// import { ComponentFixture, fakeAsync, TestBed, flush } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Observable, of } from 'rxjs';

// import { WeatherComponent } from './weather.component';
// import { Weather } from './models/weather.model';
// import { WeatherService } from './services/weather.service';
// import { Geo } from './models/geo.model';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// describe('WeatherComponent', () => {
//   let component: WeatherComponent;
//   let fixture: ComponentFixture<WeatherComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [WeatherComponent],
//       imports: [HttpClientTestingModule],
//       providers: [{ provide: WeatherService }],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WeatherComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('should get weather', () => {
//   //   const serviceInject: WeatherService = fixture.debugElement.injector.get(WeatherService);

//   //   const mockCode = 2732406;

//   //   const mockWeather = {
//   //     temperature: 12.8,
//   //     textoClima: "Chuva"
//   //   }

//   //   spyOn(serviceInject, 'getCurrentConditions');

//   //   component.pegarTempoAtual(mockCode);
//   //   // expect(component.geoObject).toEqual(mockGeoLocation);
//   //   expect(component.weatherObject.temperatura).toEqual(mockWeather.temperature);
//   //   expect(component.weatherObject.textoClima).toEqual(mockWeather.textoClima);
//   // });

//   // it('should get user location', fakeAsync(() => {
//   //   const serviceInject: WeatherService = fixture.debugElement.injector.get(WeatherService);

//   //   const mockWeather = {
//   //     localCode: 2732406,
//   //     estado: 'Paraná',
//   //     pais: 'Brasil',
//   //     cidade: 'Curitiba'
//   //   }

//   //   spyOn(serviceInject, 'getGeoPosition').and.returnValue(of(mockWeather));

//   //   spyOn(component, 'pegarTempoAtual');
//   //   spyOn(component, 'pegarPrevisao5Dias');
//   //   spyOn(component, 'pegarPrevisaoHoraAHora');

//   //   component.pegarLocalUsuario("-25.5039", "-49.2908");

//   //   expect(serviceInject.getGeoPosition).toHaveBeenCalled();
//   //   expect(component.pegarTempoAtual).toHaveBeenCalled();
//   //   expect(component.pegarPrevisao5Dias).toHaveBeenCalled();
//   //   expect(component.pegarPrevisaoHoraAHora).toHaveBeenCalled();

//   //   flush();
//   // }));

//   // it('should generate graphic', () => {


//   //   spyOn(component, 'gerarGrafico');

//   //   component.gerarGrafico();
//   //   expect(component.option).toBeTruthy();
//   // });

//   // it('should get current time', () => {
//   //   const serviceInject: WeatherService = fixture.debugElement.injector.get(WeatherService);

//   //   const mockCode = 2732406;

//   //   spyOn(serviceInject, 'getCurrentConditions').and.callThrough();

//   //   spyOn(component, 'preencher_climaAgora');

//   //   component.pegarTempoAtual(mockCode);

//   //   expect(serviceInject.getCurrentConditions).toHaveBeenCalled();
//   //   expect(component.preencher_climaAgora).toHaveBeenCalled();
//   // });

//   it('should get geo location, location found', () => {
//     const serviceInject: WeatherService = fixture.debugElement.injector.get(WeatherService);

//     const mockGeoLocation: Geo = {
//       geoplugin_latitude: "-25.5039",
//       geoplugin_longitude: "-49.2908"
//     }

//     spyOn(serviceInject, 'getGeoLocation').and.returnValue(of(mockGeoLocation));

//     spyOn(component, 'pegarLocalUsuario');

//     component.pegarGeoLocation();

//     expect(serviceInject.getGeoLocation).toHaveBeenCalled();
//     expect(component.pegarLocalUsuario).toHaveBeenCalled();
//   });

//   it('should get geo location, location not found', () => {
//     const serviceInject: WeatherService = fixture.debugElement.injector.get(WeatherService);

//     const mockGeoLocation: Geo = {
//       geoplugin_latitude: '',
//       geoplugin_longitude: ''
//     }

//     spyOn(serviceInject, 'getGeoLocation').and.returnValue(of(mockGeoLocation));

//     spyOn(component, 'pegarLocalUsuario');

//     component.pegarGeoLocation();

//     expect(serviceInject.getGeoLocation).toHaveBeenCalled();
//     expect(component.pegarLocalUsuario).toHaveBeenCalled();
//   });

//   // it('should get search result', () => {
//   //   const serviceInject: WeatherService = fixture.debugElement.injector.get(WeatherService);

//   //   const mockLocation = {
//   //     lat: '35.68',
//   //     long: '139.77'
//   //   }

//   //   const mockInput = 'tokyo';

//   //   spyOn(serviceInject, 'getCoordinates').and.returnValue(of(mockLocation));
//   //   spyOn(component, 'pegarLocalUsuario');

//   //   component.pegarCoordenadasPesquisa(mockInput);

//   //   expect(serviceInject.getCoordinates).toHaveBeenCalledWith(mockInput);
//   //   // expect(component.pegarLocalUsuario).toHaveBeenCalledWith(mockLocation.lat, mockLocation.long);
//   // });

//   it('should fill climate now', () => {
//     component.preencher_climaAgora();
//     expect(component.textoLocal).toBeTruthy();
//   });

//   it('should create informed message', () => {
//     const mockMessage: String = "Erro na pesquisa do Local";

//     component.gerarErro("Erro na pesquisa do Local");
//     expect(component.errorMessage).toEqual(mockMessage);
//   });

//   it('should create missing message', () => {
//     const mockMessage: String = "Erro na solicitação";

//     component.gerarErro("");
//     expect(component.errorMessage).toEqual(mockMessage);
//   });

// });
