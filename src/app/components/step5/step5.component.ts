// step5.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step5.component.html',
  styleUrl: './step5.component.css'
})
export class Step5Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Redirect to landing page after 3 seconds
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}