import { Component, OnInit } from '@angular/core';
import navigation from '../../../data/navigation.json'
import jwt from 'jwt-decode';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }
  public navlist = [];
  navToggle = () => {
    document.getElementById('body').classList.toggle('ms-aside-left-open');
    document.getElementById('ms-side-nav').classList.toggle('ms-aside-open');
    document.getElementById('overlayleft').classList.toggle('d-block');
  }

  ngOnInit(): void {
    const rol = jwt(localStorage.getItem('Token'))["rol"];
    switch (rol) {
      case 1: this.navlist=navigation;
      break;
    }
  }

}
