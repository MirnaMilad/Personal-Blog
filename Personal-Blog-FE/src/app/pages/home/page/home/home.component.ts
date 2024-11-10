import { CommonModule } from '@angular/common';
import { Blog, BlogRequest } from '../../models/personalBlog.model';
import { HomeApiService } from './../../services/home-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  personalBlogs!: Blog[];
  modalId: string = 'create';
  header: string = 'New Article';
  blog!: Blog;
  @ViewChild('formModal') formModal!: FormModalComponent;

  constructor(private homeApiService: HomeApiService, private router: Router) {}
  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs() {
    this.homeApiService
      .getBlogs()
      .subscribe((res) => (this.personalBlogs = res));
  }
  addBlog(formValue: BlogRequest) {
    this.homeApiService.addBlogs(formValue).subscribe(() => this.getBlogs());
  }
  updateBlog(formValue: Blog) {
    this.homeApiService.updateBlogs(formValue).subscribe(() => this.getBlogs());
  }
  deleteBlog(blogId: number) {
    this.homeApiService.deleteBlog(blogId).subscribe(() => this.getBlogs());
  }
  getSingleBlog(blog: Blog) {
    this.router.navigate(['/blogs', blog.id]);
  }

  getFormValue(formValue: Record<string, string | number | Date>) {
    if (this.modalId === 'Create') {
      this.addBlog({
        name: formValue['name'].toString(),
        date: new Date(formValue['date']),
        description: formValue['description'].toString(),
      });
    } else {
      this.updateBlog({
        id: Number(this.blog.id),
        name: formValue['name'].toString(),
        date: new Date(formValue['date']),
        description: formValue['description'].toString(),
      });
    }
  }
  getModalId(modalId: string, blog: Blog | null) {
    if (blog) this.blog = blog;
    this.modalId = modalId;
    if (modalId === 'Edit') {
      this.header = 'Update Article';
      this.formModal.patchValues(blog);
    }
  }
}
