import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quickbar',
  templateUrl: './quickbar.component.html',
  styleUrls: ['./quickbar.component.css']
})
export class QuickbarComponent implements OnInit {

  constructor() { }
  openBar = () => {
    document.getElementById('ms-quick-bar').classList.add('ms-quick-bar-open');
  }
  closeBar = () => {
    document.getElementById('ms-quick-bar').classList.remove('ms-quick-bar-open');
  }
  toggleConfigure = () => {
    document.getElementById('ms-quick-bar-list').classList.toggle('ms-qa-configure-mode');
    document.getElementById('ms-quick-bar').classList.remove('ms-quick-bar-open');
    document.getElementById('ms-quick-bar-content').classList.toggle('d-none');
    document.querySelectorAll('a.nav-link').forEach(b => b.toggleAttribute('data-rb-event-key'));
  }
  quickbardata = [
    {
      id: 1,
      name: 'To-do',
      tooltip: 'Lista de tareas',
      icon: 'flaticon-list'
    },{
      id: 2,
      name: 'Reminder',
      tooltip: 'Recordatorios',
      icon: 'flaticon-bell'
    },{
      id: 3,
      name: 'Notes',
      tooltip: 'Notas',
      icon: 'flaticon-pencil'
    },{
      id: 5,
      name: 'Settings',
      tooltip: 'Settings',
      icon: 'flaticon-gear'
    }
  ]

  ngOnInit(): void {
  }

}
