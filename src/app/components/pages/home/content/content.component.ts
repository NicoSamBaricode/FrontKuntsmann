import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { chart } from 'highcharts';
import { Label } from 'ng2-charts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { PlatosService } from 'src/app/services/platos.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  platosVendidosWidget: any = [0]
  platos: any = [0]
  ventasTotalesWidget: any = [0]
  itemsDeStockWidget: any = [0]
  notificacionesWidget: any = [0]
  top5Platos: any = [0]
  topCategorias: any = [0]
  // grafico: Chart
  // auxiliarGrafico: any = [0]
  constructor(private platosService: PlatosService, private dashboardService: DashboardService, private notificacionesService: NotificacionesService) { }
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
  public UsertrafficChartLabels: Label[] = ['Sin Especificar'];
  public UsertrafficChartData: ChartDataSets[] = [
    {
      label: "Cantidad de Ventas",
      borderColor: '#ff0018',
      pointBorderColor: '#ff0018',
      pointBackgroundColor: '#ff0018',
      pointHoverBackgroundColor: '#ff0018',
      pointHoverBorderColor: '#ff0018',
      pointBorderWidth: 1,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 1,
      pointRadius: 3,
      fill: true,
      backgroundColor: "rgba(53,127,250,0.4)",
      borderWidth: 1,
      data: [0]

    }
  ];
  public UsertrafficChartOptions: ChartOptions = {

    responsive: true,
    elements: {
      line: {
        tension: 0.1
      }
    },
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
  // ventas por plato ultimo mes
  public UserpchChartLabels: Label[] = ['Sin Especificar'];
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
      data: [0]
    }
  ];
  // // page-impressions
  // public pageimmpChartData: ChartDataSets[] = [
  //   {
  //     label: "Data",
  //     borderColor: '#fd7e14',
  //     pointBorderColor: '#fd7e14',
  //     pointBackgroundColor: '#fd7e14',
  //     pointHoverBackgroundColor: '#fd7e14',
  //     pointHoverBorderColor: '#fd7e14',
  //     pointBorderWidth: 0,
  //     pointHoverRadius: 0,
  //     pointHoverBorderWidth: 0,
  //     pointRadius: 0,
  //     fill: true,
  //     backgroundColor: "rgba(7, 190, 110,0.3)",
  //     borderWidth: 2,
  //     data: [0]
  //   }
  // ];

  public currentUserId = 1;

   


  ngOnInit(): void {
   
    //const grafico = new Chart('grafico',{type:'line', data:{datasets:[{data:[1,2,3,4]}],labels:this.UsertrafficChartLabels}, options:this.UserpchChartOptions},
    //);

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

          element.porcentaje = (parseFloat(element.cantidadVentas) / parseFloat(resp.total[0].cantidadVentasTotal)) * 100

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
        this.PieChartData = [{ data: cantidad }]
        this.PieChartLabels = labels
      }
    )
    this.dashboardService.platosvendidoshistorial().subscribe(
      (resp: any) => {
        let cantidad = []
        let labels = []
        let aux = resp.result.map((element) => {

          cantidad.push(element.cantidadVentasHistorial)
          labels.push(element.fecha)
          return element

        })


        this.UsertrafficChartData = [{ data: cantidad }]
        this.UsertrafficChartLabels = labels
      }
    )
    // this.platosService.list().subscribe(
    //   (resp: any) => {

    //     let aux = resp.result.map((element) => {


    //       return element

    //     })

    //     this.platos = aux
    //     let mes = new Date()
    //     this.dashboardService.platosvendidoshistorialmes(mes.getMonth() + 1, this.platos.id[0]).subscribe(
    //       (resp: any) => {
    //         let cantidad = []
    //         let labels = []
    //         let aux = resp.result.map((element) => {

    //           cantidad.push(element.cantidadVentasHistorial)
    //           labels.push(element.fecha)
    //           return element

    //         })

            
    //         this.engagedChartData = [{ data: cantidad }]
    //         this.auxiliarGrafico = cantidad 
    //         this.UserpchChartLabels = labels
    //       }
    //     )
    //   }
    // )




  }
  // selectPlato(event) {
  //   let mes = new Date()
  //   this.dashboardService.platosvendidoshistorialmes(mes.getMonth() + 1, event.target.value).subscribe(
  //     (resp: any) => {
  //       let cantidad = []

  //       let labels = []
  //       let aux = resp.result.map((element) => {
  //         cantidad.push(element.cantidadVentasHistorialMes)

  //         labels.push(element.fecha)
  //         return element
          
  //       })
  //       // let aux2 = resp.result2.map((element) => {

  //       //   cantidad2.push(element.cantidadVentasHistorialMes)
  //       //   labels.push(element.fecha)
  //       //   return element

  //       // })

  //       this.grafico.update()
  //       this.engagedChartData = [{ data: cantidad }]
  //       this.UserpchChartLabels = labels

  //       console.log(resp.result)
  //     }
  //   )
  // }
}
