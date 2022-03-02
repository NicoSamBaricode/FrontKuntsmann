import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  platosVendidosWidget: any = [0]
  ventasTotalesWidget: any = [0]
  itemsDeStockWidget: any = [0]
  notificacionesWidget: any = [0]
  top5Platos: any = [0]
  topCategorias: any = [0]
  constructor(private dashboardService: DashboardService, private notificacionesService: NotificacionesService) { }
  // Statics
  statbox = [
    {
      icon: 'folder',
      title: 'My Products',
      text: 'Manage Products',
      notification: 6
    },
    {
      icon: 'people',
      title: 'My Clients',
      text: 'Manage Users',
      notification: 5
    },
    {
      icon: 'help',
      title: 'Support Tickets',
      text: 'View Tickets',
      notification: 3
    },
    {
      icon: 'graphic_eq',
      title: 'Management',
      text: 'Manage Product',
      notification: 2
    },
  ];
  // User Country
  // Pie chart
  public PieChartLabels: Label[] = ['Sin Especificar']
  public PieChartType: ChartType = 'pie';
  public PieChartData: ChartDataSets[] = [
    {
      label: "Categorias",

      data: [0]
    }
  ];
  public PieChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: false,
      text: 'Categorias Mas Vendidas'
    },
    legend: {
      display: true
    },
  }

  public lineChartType: ChartType = 'line';
  // User Traffic
  public UsertrafficChartLabels: Label[] = ["Jan-11", "Jan-12", "Jan-13", "Jan-14", "Jan-15", "Jan-16", "Jan-17", "Jan-18", "Jan-19"];
  public UsertrafficChartData: ChartDataSets[] = [
    {
      label: "Users",
      borderColor: '#ff0018',
      pointBorderColor: '#ff0018',
      pointBackgroundColor: '#ff0018',
      pointHoverBackgroundColor: '#ff0018',
      pointHoverBorderColor: '#ff0018',
      pointBorderWidth: 1,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 1,
      pointRadius: 2,
      fill: true,
      backgroundColor: "rgba(53,127,250,0.4)",
      borderWidth: 1,
      data: [1800, 1600, 2300, 2800, 3600, 2900, 3000, 3800, 3600]
    }
  ];
  public UsertrafficChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
      position: "bottom"
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: "#A8A9AD",
          beginAtZero: true,
          maxTicksLimit: 200,
          padding: 20
        },
        gridLines: {
          drawTicks: false,
          display: false
        }

      }],
      xAxes: [{
        gridLines: {
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#A8A9AD"
        }
      }]
    }
  }
  // User Purchase
  public UserpchChartLabels: Label[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
  public UserpchChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    },
    legend: {
      display: false,
      position: "bottom"
    },
    scales: {
      yAxes: [{
        display: false,
      }],
      xAxes: [{
        display: false,
      }]
    }
  };
  // engaged-users
  public engagedChartData: ChartDataSets[] = [
    {
      label: "Data",
      borderColor: '#07be6e',
      pointBorderColor: '#07be6e',
      pointBackgroundColor: '#07be6e',
      pointHoverBackgroundColor: '#07be6e',
      pointHoverBorderColor: '#07be6e',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      fill: true,
      backgroundColor: "rgba(7, 190, 110,0.3)",
      borderWidth: 2,
      data: [5, 1, 8, 1, 3, 7, 8, 4, 3, 6, 8, 9, 4, 5, 8, 2, 6, 4, 8, 3]
    }
  ];
  // page-impressions
  public pageimmpChartData: ChartDataSets[] = [
    {
      label: "Data",
      borderColor: '#07be6e',
      pointBorderColor: '#07be6e',
      pointBackgroundColor: '#07be6e',
      pointHoverBackgroundColor: '#07be6e',
      pointHoverBorderColor: '#07be6e',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      fill: true,
      backgroundColor: "rgba(7, 190, 110,0.3)",
      borderWidth: 2,
      data: [8, 5, 1, 8, 5, 9, 4, 3, 4, 5, 8, 4, 4, 8, 9, 5, 5, 1, 3, 6]
    }
  ];

  public currentUserId = 1;




  ngOnInit(): void {
    this.notificacionesService.cantidad().subscribe(
      (resp: any) => {

        let aux = resp.result.map((element) => {

          return element

        })
        this.notificacionesWidget = aux[0].numero_notificaciones

      }
    )
    this.dashboardService.platosvendidosmes().subscribe(
      (resp: any) => {

        let aux = resp.result.map((element) => {

          return element

        })
        this.platosVendidosWidget = aux[0].cantidadVentasMes

      }
    )
    this.dashboardService.platosvendidos().subscribe(
      (resp: any) => {

        let aux = resp.result.map((element) => {

          return element

        })
        this.ventasTotalesWidget = aux[0].cantidadVentasMes

      }
    )
    this.dashboardService.itemsstock().subscribe(
      (resp: any) => {

        let aux = resp.result.map((element) => {

          return element

        })
        this.itemsDeStockWidget = aux[0].itemsStoks

      }
    )
    this.dashboardService.platosmasvendidos().subscribe(
      (resp: any) => {

        let aux = resp.result.map((element) => {
//falta agregar porcentaje resp.total
          return element

        })
        this.top5Platos = aux

      }
    )//falta agregar porcentaje
    this.dashboardService.platosmasvendidoscategorias().subscribe(
      (resp: any) => {        
        let cantidad = []
        let labels = []
        let aux = resp.result.map((element) => {
          cantidad.push(element.cantidadVentas)
          labels.push(element.descripcion)
          return element

        })

        this.topCategorias = aux
        this.PieChartData = [{data:cantidad}]        
        this.PieChartLabels = labels
      }
    )
  }

}
