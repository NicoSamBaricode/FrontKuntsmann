import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Home
  { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule), data: { breadcrumb: "Homepage" } },
 
  // ruteo de paginas propias
  { path: 'proveedores-list', loadChildren: () => import('./components/pages/proveedores/proveedores-list/proveedores-list.module').then(m => m.ProveedoresListModule), data: { breadcrumb: "Listar Proveedores" } },
  { path: 'proveedores-form', loadChildren: () => import('./components/pages/proveedores/proveedores-form/proveedores-form.module').then(m => m.ProveedoresFormModule), data: { breadcrumb: "Crear Proveedores" } },
  { path: 'usuarios-form', loadChildren: () => import('./components/pages/usuarios/usuarios-form/usuarios-form.module').then(m => m.UsuariosFormModule), data: { breadcrumb: "Crear Usuarios" } },
  { path: 'almacenes-form', loadChildren: () => import('./components/pages/Almacenes/almacenes-form/almacenes-form.module').then(m => m.AlmacenesFormModule) },
  { path: 'almacenes-list', loadChildren: () => import('./components/pages/Almacenes/almacenes-list/almacenes-list.module').then(m => m.AlmacenesListModule) },
  { path: 'categorias-list', loadChildren: () => import('./components/pages/Categorias/categorias-list/categorias-list.module').then(m => m.CategoriasListModule) },
  { path: 'categorias-form', loadChildren: () => import('./components/pages/Categorias/categorias-form/categorias-form.module').then(m => m.CategoriasFormModule) },
  { path: 'etapas-form', loadChildren: () => import('./components/pages/Etapas/etapas-form/etapas-form.module').then(m => m.EtapasFormModule) },
  { path: 'etapas-list', loadChildren: () => import('./components/pages/Etapas/etapas-list/etapas-list.module').then(m => m.EtapasListModule) },
  { path: 'productos-list', loadChildren: () => import('./components/pages/Productos/productos-list/productos-list.module').then(m => m.ProductosListModule) },
  { path: 'productos-form', loadChildren: () => import('./components/pages/Productos/productos-form/productos-form.module').then(m => m.ProductosFormModule) },
  { path: 'stock-form', loadChildren: () => import('./components/pages/Stock/stock-form/stock-form.module').then(m => m.StockFormModule) },
  { path: 'stock-list', loadChildren: () => import('./components/pages/Stock/stock-list/stock-list.module').then(m => m.StockListModule) },
  { path: 'notificaciones-list', loadChildren: () => import('./components/pages/notificaciones/notificaciones-list/notificaciones-list.module').then(m => m.NotificacionesListModule) },
  
  // Product
  { path: 'product/product-catalogue', loadChildren: () => import('./components/pages/product/product-catalogue/product-catalogue.module').then(m => m.ProductCatalogueModule), data: { breadcrumb: "Product Catalogue" } },
  { path: 'product/product-list', loadChildren: () => import('./components/pages/product/product-list/product-list.module').then(m => m.ProductListModule), data: { breadcrumb: "Product List" } },
  { path: 'product/product-grid', loadChildren: () => import('./components/pages/product/product-grid/product-grid.module').then(m => m.ProductGridModule), data: { breadcrumb: "Product Grid" } },
  { path: 'product/add-product', loadChildren: () => import('./components/pages/product/add-product/add-product.module').then(m => m.AddProductModule), data: { breadcrumb: "Add Product" } },
  { path: 'product/product-detail/:id', loadChildren: () => import('./components/pages/product/product-detail/product-detail.module').then(m => m.ProductDetailModule), data: { breadcrumb: "Product Details" } },
  // Invoice
  { path: 'invoice/invoice-detail', loadChildren: () => import('./components/pages/invoice/invoice-detail/invoice-detail.module').then(m => m.InvoiceDetailModule), data: { breadcrumb: "Invoice Detail" } },
  { path: 'invoice/invoice-list', loadChildren: () => import('./components/pages/invoice/invoice-list/invoice-list.module').then(m => m.InvoiceListModule), data: { breadcrumb: "Invoice List" } },
  // Customers
  { path: 'customer/customer-review', loadChildren: () => import('./components/pages/customer/customer-review/customer-review.module').then(m => m.CustomerReviewModule), data: { breadcrumb: "Customer Review" } },
  { path: 'customer/customer-list', loadChildren: () => import('./components/pages/customer/customer-list/customer-list.module').then(m => m.CustomerListModule), data: { breadcrumb: "Customer List" } },
  { path: 'customer/social', loadChildren: () => import('./components/pages/customer/social/social.module').then(m => m.SocialModule), data: { breadcrumb: "Social Activity" } },
  // Ui-basic
  { path: 'ui-basic/accordions', loadChildren: () => import('./components/pages/ui-basic/accordions/accordions.module').then(m => m.AccordionsModule), data: { breadcrumb: "Accordions" } },
  { path: 'ui-basic/alerts', loadChildren: () => import('./components/pages/ui-basic/alerts/alerts.module').then(m => m.AlertsModule), data: { breadcrumb: "Alerts" } },
  { path: 'ui-basic/buttons', loadChildren: () => import('./components/pages/ui-basic/buttons/buttons.module').then(m => m.ButtonsModule), data: { breadcrumb: "Buttons" } },
  { path: 'ui-basic/breadcrumbs', loadChildren: () => import('./components/pages/ui-basic/breadcrumbs/breadcrumbs.module').then(m => m.BreadcrumbsModule), data: { breadcrumb: "Breadcrumbs" } },
  { path: 'ui-basic/badges', loadChildren: () => import('./components/pages/ui-basic/badges/badges.module').then(m => m.BadgesModule), data: { breadcrumb: "Badges" } },
  { path: 'ui-basic/cards', loadChildren: () => import('./components/pages/ui-basic/cards/cards.module').then(m => m.CardsModule), data: { breadcrumb: "Cards" } },
  { path: 'ui-basic/progress-bars', loadChildren: () => import('./components/pages/ui-basic/progress-bars/progress-bars.module').then(m => m.ProgressBarsModule), data: { breadcrumb: "Progress Bars" } },
  { path: 'ui-basic/preloaders', loadChildren: () => import('./components/pages/ui-basic/preloaders/preloaders.module').then(m => m.PreloadersModule), data: { breadcrumb: "Pre-loaders" } },
  { path: 'ui-basic/pagination', loadChildren: () => import('./components/pages/ui-basic/pagination/pagination.module').then(m => m.PaginationModule), data: { breadcrumb: "Pagination" } },
  { path: 'ui-basic/tabs', loadChildren: () => import('./components/pages/ui-basic/tabs/tabs.module').then(m => m.TabsModule), data: { breadcrumb: "Tabs" } },
  { path: 'ui-basic/typography', loadChildren: () => import('./components/pages/ui-basic/typography/typography.module').then(m => m.TypographyModule), data: { breadcrumb: "Typography" } },
  // Ui-advanced
  { path: 'ui-advanced/draggables', loadChildren: () => import('./components/pages/ui-advanced/draggables/draggables.module').then(m => m.DraggablesModule), data: { breadcrumb: "Draggables" } },
  { path: 'ui-advanced/sliders', loadChildren: () => import('./components/pages/ui-advanced/sliders/sliders.module').then(m => m.SlidersModule), data: { breadcrumb: "Sliders" } },
  { path: 'ui-advanced/modals', loadChildren: () => import('./components/pages/ui-advanced/modals/modals.module').then(m => m.ModalsModule), data: { breadcrumb: "Modals" } },
  { path: 'ui-advanced/rating', loadChildren: () => import('./components/pages/ui-advanced/rating/rating.module').then(m => m.RatingModule), data: { breadcrumb: "Rating" } },
  { path: 'ui-advanced/tour', loadChildren: () => import('./components/pages/ui-advanced/tour/tour.module').then(m => m.TourModule), data: { breadcrumb: "Tour" } },
  { path: 'ui-advanced/cropper', loadChildren: () => import('./components/pages/ui-advanced/cropper/cropper.module').then(m => m.CropperModule), data: { breadcrumb: "Cropper" } },
  // Forms
  { path: 'form/form-elements', loadChildren: () => import('./components/pages/form/form-elements/form-elements.module').then(m => m.FormElementsModule), data: { breadcrumb: "Form Elements" } },
  { path: 'form/form-layouts', loadChildren: () => import('./components/pages/form/form-layouts/form-layouts.module').then(m => m.FormLayoutsModule), data: { breadcrumb: "Form Layouts" } },
  { path: 'form/form-validation', loadChildren: () => import('./components/pages/form/form-validation/form-validation.module').then(m => m.FormValidationModule), data: { breadcrumb: "Form Validation" } },
  { path: 'form/form-wizard', loadChildren: () => import('./components/pages/form/form-wizard/form-wizard.module').then(m => m.FormWizardModule), data: { breadcrumb: "Form Wizard" } },
  // Charts
  { path: 'charts/chartjs', loadChildren: () => import('./components/pages/charts/chartjs/chartjs.module').then(m => m.ChartjsModule), data: { breadcrumb: "Chart JS" } },
  { path: 'charts/google-charts', loadChildren: () => import('./components/pages/charts/google-charts/google-charts.module').then(m => m.GoogleChartsModule), data: { breadcrumb: "Google Charts" } },
  // Tables
  { path: 'tables/basic-tables', loadChildren: () => import('./components/pages/tables/basic-tables/basic-tables.module').then(m => m.BasicTablesModule), data: { breadcrumb: "Basic Tables" } },
  { path: 'tables/data-tables', loadChildren: () => import('./components/pages/tables/data-tables/data-tables.module').then(m => m.DataTablesModule), data: { breadcrumb: "Data Tables" } },
  // Popups
  { path: 'popups/sweet-alerts', loadChildren: () => import('./components/pages/popups/sweet-alerts/sweet-alerts.module').then(m => m.SweetAlertsModule), data: { breadcrumb: "Sweet Alerts" } },
  { path: 'popups/toast', loadChildren: () => import('./components/pages/popups/toast/toast.module').then(m => m.ToastModule), data: { breadcrumb: "Toast" } },
  // Icons
  { path: 'icons/fontawesome', loadChildren: () => import('./components/pages/icons/fontawesome/fontawesome.module').then(m => m.FontawesomeModule), data: { breadcrumb: "Fontawesome Icons" } },
  { path: 'icons/flaticons', loadChildren: () => import('./components/pages/icons/flaticons/flaticons.module').then(m => m.FlaticonsModule), data: { breadcrumb: "Flaticons" } },
  { path: 'icons/materialize', loadChildren: () => import('./components/pages/icons/materialize/materialize.module').then(m => m.MaterializeModule), data: { breadcrumb: "Material Icons" } },
  // Maps
  { path: 'maps/google-maps', loadChildren: () => import('./components/pages/maps/google-maps/google-maps.module').then(m => m.GoogleMapsModule), data: { breadcrumb: "Google Maps" } },
  { path: 'maps/vector-maps', loadChildren: () => import('./components/pages/maps/vector-maps/vector-maps.module').then(m => m.VectorMapsModule), data: { breadcrumb: "Vector Maps" } },
  // Dashboard
  { path: 'dashboard/web-analytics', loadChildren: () => import('./components/pages/dashboard/web-analytics/web-analytics.module').then(m => m.WebAnalyticsModule), data: { breadcrumb: "Web Analytics" } },
  { path: 'dashboard/project-management', loadChildren: () => import('./components/pages/dashboard/project-management/project-management.module').then(m => m.ProjectManagementModule), data: { breadcrumb: "Project Management" } },
  { path: 'dashboard/client-management', loadChildren: () => import('./components/pages/dashboard/client-management/client-management.module').then(m => m.ClientManagementModule), data: { breadcrumb: "Client Management" } },
  // Prebuilt-pages
  { path: '', loadChildren: () => import('./components/pages/prebuilt-pages/default-login/default-login.module').then(m => m.DefaultLoginModule), data: { breadcrumb: "Default Login" } },
  { path: 'prebuilt-pages/modal-login', loadChildren: () => import('./components/pages/prebuilt-pages/modal-login/modal-login.module').then(m => m.ModalLoginModule), data: { breadcrumb: "Modal Login" } },
  { path: 'prebuilt-pages/default-register', loadChildren: () => import('./components/pages/prebuilt-pages/default-register/default-register.module').then(m => m.DefaultRegisterModule), data: { breadcrumb: "Default Register" } },
  { path: 'prebuilt-pages/modal-register', loadChildren: () => import('./components/pages/prebuilt-pages/modal-register/modal-register.module').then(m => m.ModalRegisterModule), data: { breadcrumb: "Modal Register" } },
  { path: 'prebuilt-pages/lock-screen', loadChildren: () => import('./components/pages/prebuilt-pages/lock-screen/lock-screen.module').then(m => m.LockScreenModule), data: { breadcrumb: "Lock Screen" } },
  { path: 'prebuilt-pages/coming-soon', loadChildren: () => import('./components/pages/prebuilt-pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule), data: { breadcrumb: "Coming Soon" } },
  { path: 'pageError', loadChildren: () => import('./components/pages/prebuilt-pages/error/error.module').then(m => m.ErrorModule), data: { breadcrumb: "Error 404" } },
  { path: 'prebuilt-pages/faqs', loadChildren: () => import('./components/pages/prebuilt-pages/faqs/faqs.module').then(m => m.FaqsModule), data: { breadcrumb: "FAQ's" } },
  { path: 'prebuilt-pages/portfolio', loadChildren: () => import('./components/pages/prebuilt-pages/portfolio/portfolio.module').then(m => m.PortfolioModule), data: { breadcrumb: "Portfolio" } },
  { path: 'prebuilt-pages/user-profile', loadChildren: () => import('./components/pages/prebuilt-pages/user-profile/user-profile.module').then(m => m.UserProfileModule), data: { breadcrumb: "User Profile" } },
  { path: 'prebuilt-pages/invoice', loadChildren: () => import('./components/pages/prebuilt-pages/invoice/invoice.module').then(m => m.InvoiceModule), data: { breadcrumb: "Invoice" } },
  // Apps
 
  { path: 'apps/to-do-list', loadChildren: () => import('./components/pages/apps/to-do-list/to-do-list.module').then(m => m.ToDoListModule), data: { breadcrumb: "To-Do-List" } },
  // Additional
  { path: 'orders', loadChildren: () => import('./components/pages/orders/orders.module').then(m => m.OrdersModule), data: { breadcrumb: "Orders" } },
  { path: 'restaurants', loadChildren: () => import('./components/pages/restaurants/restaurants.module').then(m => m.RestaurantsModule), data: { breadcrumb: "Restaurants" } },
  { path: 'sales', loadChildren: () => import('./components/pages/sales/sales.module').then(m => m.SalesModule), data: { breadcrumb: "Sales" } },
  { path: 'widgets', loadChildren: () => import('./components/pages/widgets/widgets.module').then(m => m.WidgetsModule), data: { breadcrumb: "Widgets" } },
  { path: 'animation', loadChildren: () => import('./components/pages/animation/animation.module').then(m => m.AnimationModule), data: { breadcrumb: "Animations" } },
  { path: 'usuarios-list', loadChildren: () => import('./components/pages/usuarios/usuarios-list/usuarios-list.module').then(m => m.UsuariosListModule) },
  { path: 'ventas-form', loadChildren: () => import('./components/pages/Ventas/ventas-form/ventas-form.module').then(m => m.VentasFormModule) },
  { path: 'ventas-list', loadChildren: () => import('./components/pages/Ventas/ventas-list/ventas-list.module').then(m => m.VentasListModule) },
  { path: 'comprobantes-list', loadChildren: () => import('./components/pages/Comprobantes/comprobantes-list/comprobantes-list.module').then(m => m.ComprobantesListModule) },
  { path: 'comprobantes-form', loadChildren: () => import('./components/pages/Comprobantes/comprobantes-form/comprobantes-form.module').then(m => m.ComprobantesFormModule) },
  { path: 'transferenciaStock-form', loadChildren: () => import('./components/pages/Stock/transferencia-stock-form/transferencia-stock-form.module').then(m => m.TransferenciaStockFormModule) },
  { path: 'stockTotal-list', loadChildren: () => import('./components/pages/Stock/stock-total-list/stock-total-list.module').then(m => m.StockTotalListModule) },
  { path: 'ventas-excel-form', loadChildren: () => import('./components/pages/Ventas/ventas-excel-form/ventas-excel-form.module').then(m => m.VentasExcelFormModule) },
  { path: 'stock-detalle-form', loadChildren: () => import('./components/pages/Stock/stock-detalle-form/stock-detalle-form.module').then(m => m.StockDetalleFormModule) },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
