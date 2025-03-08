import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { CoursesService } from '../../services/courses.service';
import { CardComponent } from '../Cards/card.component';
import { log } from 'console';

@Component({
  selector: 'app-course-list',
  imports: [NgFor, CardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  mentorId: number = 0;
  mentor: any;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.mentorId = this.getMentorIdFromSession();
    // this.coursesService.getCoursesByMentor(this.mentorId).subscribe({
    //   next: (data) => {
    //     this.courses = data.cursos;
    //     this.mentor = data.mentor;
    //   },
    //   error: (error) => {
    //     console.error("Error cargando los cursos del mentor:", error);
    //   }
    // });
    fetch('assets/courses.json')
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter(
          (res: { id: number }) => res.id == this.mentorId
        );
        this.mentor = filterData[0].nombre;
        this.courses = filterData[0].cursos;
      });
  }

  getMentorIdFromSession(): number {
    // Simulación de autenticación (en un futuro esto vendría del backend)
    return 502; // ID del mentor que ha iniciado sesión
  }
}
