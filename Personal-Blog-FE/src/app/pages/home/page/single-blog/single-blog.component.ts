import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeApiService } from '../../services/home-api.service';
import { Blog } from '../../models/personalBlog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss',
})
export class SingleBlogComponent {
  blogId: number | null = null;
  blog!: Blog;
  constructor(
    private route: ActivatedRoute,
    private homeApiService: HomeApiService
  ) {}

  ngOnInit(): void {
    // Get the `id` parameter from the route
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));

    // If you need to fetch blog details using this ID, call the service here
    this.fetchBlogDetails(this.blogId);
  }

  fetchBlogDetails(blogId: number | null) {
    if (blogId !== null) {
      this.homeApiService
        .getBlogById(blogId)
        .subscribe((res) => (this.blog = res));
    }
  }
}
