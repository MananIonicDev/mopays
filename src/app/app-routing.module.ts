import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  /*{
    path: 'user-details',
    loadChildren: () => import('./users-details/users-details.module').then( m => m.UsersDetailsPageModule)
  },*/
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'service-view',
    loadChildren: () => import('./service-view/service-view.module').then( m => m.ServiceViewPageModule)
  },
  {
    path: 'service-add',
    loadChildren: () => import('./service-add/service-add.module').then( m => m.ServiceAddPageModule)
  },
  {
    path: 'service-category',
    loadChildren: () => import('./service-category/service-category.module').then( m => m.ServiceCategoryPageModule)
  },
  {
    path: 'service-comment',
    loadChildren: () => import('./service-comment/service-comment.module').then( m => m.ServiceCommentPageModule)
  },
  {
    path: 'service-details',
    loadChildren: () => import('./service-details/service-details.module').then( m => m.ServiceDetailsPageModule)
  },
  {
    path: 'service-edit',
    loadChildren: () => import('./service-edit/service-edit.module').then( m => m.ServiceEditPageModule)
  },
  {
    path: 'service-image',
    loadChildren: () => import('./service-image/service-image.module').then( m => m.ServiceImagePageModule)
  },
  {
    path: 'service-my',
    loadChildren: () => import('./service-my/service-my.module').then( m => m.ServiceMyPageModule)
  },
  {
    path: 'service-image-edit',
    loadChildren: () => import('./service-image-edit/service-image-edit.module').then( m => m.ServiceImageEditPageModule)
  },
  {
    path: 'service-image-add',
    loadChildren: () => import('./service-image-add/service-image-add.module').then( m => m.ServiceImageAddPageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./favourite/favourite.module').then( m => m.FavouritePageModule)
  },
  {
    path: 'feed-add',
    loadChildren: () => import('./feed-add/feed-add.module').then( m => m.FeedAddPageModule)
  },
  {
    path: 'feed-comment',
    loadChildren: () => import('./feed-comment/feed-comment.module').then( m => m.FeedCommentPageModule)
  },
  {
    path: 'news-category',
    loadChildren: () => import('./news-category/news-category.module').then( m => m.NewsCategoryPageModule)
  },
  {
    path: 'news-details',
    loadChildren: () => import('./news-details/news-details.module').then( m => m.NewsDetailsPageModule)
  },
  {
    path: 'explore-category',
    loadChildren: () => import('./explore-category/explore-category.module').then( m => m.ExploreCategoryPageModule)
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then( m => m.WeatherPageModule)
  },
  {
    path: 'weather-set',
    loadChildren: () => import('./weather-set/weather-set.module').then( m => m.WeatherSetPageModule)
  },
  {
    path: 'emergency',
    loadChildren: () => import('./emergency/emergency.module').then( m => m.EmergencyPageModule)
  },
  {
    path: 'essentials',
    loadChildren: () => import('./essentials/essentials.module').then( m => m.EssentialsPageModule)
  },
  {
    path: 'bill',
    loadChildren: () => import('./bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'radio',
    loadChildren: () => import('./radio/radio.module').then( m => m.RadioPageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'business',
    loadChildren: () => import('./business/business.module').then( m => m.BusinessPageModule)
  },
  {
    path: 'business-add',
    loadChildren: () => import('./business-add/business-add.module').then( m => m.BusinessAddPageModule)
  },
  {
    path: 'business-details',
    loadChildren: () => import('./business-details/business-details.module').then( m => m.BusinessDetailsPageModule)
  },
  {
    path: 'business-my',
    loadChildren: () => import('./business-my/business-my.module').then( m => m.BusinessMyPageModule)
  },
  {
    path: 'business-edit',
    loadChildren: () => import('./business-edit/business-edit.module').then( m => m.BusinessEditPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'business-by-category',
    loadChildren: () => import('./business-by-category/business-by-category.module').then( m => m.BusinessByCategoryPageModule)
  },
  {
    path: 'gallery-by-category',
    loadChildren: () => import('./gallery-by-category/gallery-by-category.module').then( m => m.GalleryByCategoryPageModule)
  },
  {
    path: 'gallery-slide',
    loadChildren: () => import('./gallery-slide/gallery-slide.module').then( m => m.GallerySlidePageModule)
  },
  {
    path: 'services-view',
    loadChildren: () => import('./services-view/services-view.module').then( m => m.ServicesViewPageModule)
  },
  {
    path: 'pub',
    loadChildren: () => import('./pub/pub.module').then( m => m.PubPageModule)
  },
  {
    path: 'radios',
    loadChildren: () => import('./radios/radios.module').then( m => m.RadiosPageModule)
  },
  {
    path: 'people',
    loadChildren: () => import('./people/people.module').then( m => m.PeoplePageModule)
  },
  {
    path: 'users-details',
    loadChildren: () => import('./users-details/users-details.module').then( m => m.UsersDetailsPageModule)
  },
  {
    path: 'following',
    loadChildren: () => import('./following/following.module').then( m => m.FollowingPageModule)
  },
  {
    path: 'followers',
    loadChildren: () => import('./followers/followers.module').then( m => m.FollowersPageModule)
  },
  {
    path: 'auto-complete',
    loadChildren: () => import('./auto-complete/auto-complete.module').then( m => m.AutoCompletePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'map-details',
    loadChildren: () => import('./map-details/map-details.module').then( m => m.MapDetailsPageModule)
  },
  {
    path: 'listings',
    loadChildren: () => import('./listings/listings.module').then( m => m.ListingsPageModule)
  },
  {
    path: 'listing-subcat',
    loadChildren: () => import('./listing-subcat/listing-subcat.module').then( m => m.ListingSubcatPageModule)
  },
  {
    path: 'listing-sell',
    loadChildren: () => import('./listing-sell/listing-sell.module').then( m => m.ListingSellPageModule)
  },
  {
    path: 'listing-search',
    loadChildren: () => import('./listing-search/listing-search.module').then( m => m.ListingSearchPageModule)
  },
  {
    path: 'listing-details',
    loadChildren: () => import('./listing-details/listing-details.module').then( m => m.ListingDetailsPageModule)
  },
  {
    path: 'listing-by-category',
    loadChildren: () => import('./listing-by-category/listing-by-category.module').then( m => m.ListingByCategoryPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'feed-edit',
    loadChildren: () => import('./feed-edit/feed-edit.module').then( m => m.FeedEditPageModule)
  },
  {
    path: 'my-dashboard',
    loadChildren: () => import('./my-dashboard/my-dashboard.module').then( m => m.MyDashboardPageModule)
  },
  {
    path: 'scratch',
    loadChildren: () => import('./scratch/scratch.module').then( m => m.ScratchPageModule)
  },
  {
    path: 'my-items',
    loadChildren: () => import('./my-items/my-items.module').then( m => m.MyItemsPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'event-add',
    loadChildren: () => import('./event-add/event-add.module').then( m => m.EventAddPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'jobs-category',
    loadChildren: () => import('./jobs-category/jobs-category.module').then( m => m.JobsCategoryPageModule)
  },
  {
    path: 'jobs-details',
    loadChildren: () => import('./jobs-details/jobs-details.module').then( m => m.JobsDetailsPageModule)
  },
  {
    path: 'jobs-view',
    loadChildren: () => import('./jobs-view/jobs-view.module').then( m => m.JobsViewPageModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: 'jobs-all',
    loadChildren: () => import('./jobs-all/jobs-all.module').then( m => m.JobsAllPageModule)
  },
  {
    path: 'jobs-add',
    loadChildren: () => import('./jobs-add/jobs-add.module').then( m => m.JobsAddPageModule)
  },
  {
    path: 'gallery-list',
    loadChildren: () => import('./gallery-list/gallery-list.module').then( m => m.GalleryListPageModule)
  },
  {
    path: 'gallery-comment',
    loadChildren: () => import('./gallery-comment/gallery-comment.module').then( m => m.GalleryCommentPageModule)
  },
  {
    path: 'gallery-post',
    loadChildren: () => import('./gallery-post/gallery-post.module').then( m => m.GalleryPostPageModule)
  },
  {
    path: 'pub-category',
    loadChildren: () => import('./pub-category/pub-category.module').then( m => m.PubCategoryPageModule)
  },
  {
    path: 'pub-details',
    loadChildren: () => import('./pub-details/pub-details.module').then( m => m.PubDetailsPageModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups/groups.module').then( m => m.GroupsPageModule)
  },
  {
    path: 'groups-all',
    loadChildren: () => import('./groups-all/groups-all.module').then( m => m.GroupsAllPageModule)
  },
  {
    path: 'groups-my',
    loadChildren: () => import('./groups-my/groups-my.module').then( m => m.GroupsMyPageModule)
  },
  {
    path: 'group-details',
    loadChildren: () => import('./group-details/group-details.module').then( m => m.GroupDetailsPageModule)
  },
  {
    path: 'group-create',
    loadChildren: () => import('./group-create/group-create.module').then( m => m.GroupCreatePageModule)
  },
  {
    path: 'group-post',
    loadChildren: () => import('./group-post/group-post.module').then( m => m.GroupPostPageModule)
  },
  {
    path: 'group-info',
    loadChildren: () => import('./group-info/group-info.module').then( m => m.GroupInfoPageModule)
  },
  {
    path: 'group-edit',
    loadChildren: () => import('./group-edit/group-edit.module').then( m => m.GroupEditPageModule)
  },
  {
    path: 'group-members',
    loadChildren: () => import('./group-members/group-members.module').then( m => m.GroupMembersPageModule)
  },
  {
    path: 'group-feed-edit',
    loadChildren: () => import('./group-feed-edit/group-feed-edit.module').then( m => m.GroupFeedEditPageModule)
  },
  {
    path: 'group-comment',
    loadChildren: () => import('./group-comment/group-comment.module').then( m => m.GroupCommentPageModule)
  },
  {
    path: 'group-search',
    loadChildren: () => import('./group-search/group-search.module').then( m => m.GroupSearchPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'message-chat',
    loadChildren: () => import('./message-chat/message-chat.module').then( m => m.MessageChatPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'explore-details',
    loadChildren: () => import('./explore-details/explore-details.module').then( m => m.ExploreDetailsPageModule)
  },
  {
    path: 'explore-submit',
    loadChildren: () => import('./explore-submit/explore-submit.module').then( m => m.ExploreSubmitPageModule)
  },
  {
    path: 'explore-comment',
    loadChildren: () => import('./explore-comment/explore-comment.module').then( m => m.ExploreCommentPageModule)
  },
  {
    path: 'explore-images',
    loadChildren: () => import('./explore-images/explore-images.module').then( m => m.ExploreImagesPageModule)
  },
  {
    path: 'business-comment',
    loadChildren: () => import('./business-comment/business-comment.module').then( m => m.BusinessCommentPageModule)
  },
  {
    path: 'my-services',
    loadChildren: () => import('./my-services/my-services.module').then( m => m.MyServicesPageModule)
  },
  {
    path: 'my-business',
    loadChildren: () => import('./my-business/my-business.module').then( m => m.MyBusinessPageModule)
  },
  {
    path: 'my-jobs',
    loadChildren: () => import('./my-jobs/my-jobs.module').then( m => m.MyJobsPageModule)
  },
  {
    path: 'my-events',
    loadChildren: () => import('./my-events/my-events.module').then( m => m.MyEventsPageModule)
  },
  {
    path: 'my-groups',
    loadChildren: () => import('./my-groups/my-groups.module').then( m => m.MyGroupsPageModule)
  },
  {
    path: 'business-add-product',
    loadChildren: () => import('./business-add-product/business-add-product.module').then( m => m.BusinessAddProductPageModule)
  },
  {
    path: 'quick-add',
    loadChildren: () => import('./quick-add/quick-add.module').then( m => m.QuickAddPageModule)
  },
  {
    path: 'search-all',
    loadChildren: () => import('./search-all/search-all.module').then( m => m.SearchAllPageModule)
  },
  {
    path: 'latest',
    loadChildren: () => import('./latest/latest.module').then( m => m.LatestPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'image-modal-business',
    loadChildren: () => import('./image-modal-business/image-modal-business.module').then( m => m.ImageModalBusinessPageModule)
  },
  {
    path: 'imagemodalbizpro',
    loadChildren: () => import('./imagemodalbizpro/imagemodalbizpro.module').then( m => m.ImagemodalbizproPageModule)
  },
  {
    path: 'feed-modal',
    loadChildren: () => import('./feed-modal/feed-modal.module').then( m => m.FeedModalPageModule)
  },
  {
    path: 'explore-modal',
    loadChildren: () => import('./explore-modal/explore-modal.module').then( m => m.ExploreModalPageModule)
  },
  {
    path: 'complete-profile',
    loadChildren: () => import('./complete-profile/complete-profile.module').then( m => m.CompleteProfilePageModule)
  },
  {
    path: 'profile-modal',
    loadChildren: () => import('./profile-modal/profile-modal.module').then( m => m.ProfileModalPageModule)
  },
  {
    path: 'user-modal',
    loadChildren: () => import('./user-modal/user-modal.module').then( m => m.UserModalPageModule)
  },
  {
    path: 'rating-modal',
    loadChildren: () => import('./rating-modal/rating-modal.module').then( m => m.RatingModalPageModule)
  },
  {
    path: 'message-modal',
    loadChildren: () => import('./message-modal/message-modal.module').then( m => m.MessageModalPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'feed-details',
    loadChildren: () => import('./feed-details/feed-details.module').then( m => m.FeedDetailsPageModule)
  },
  {
    path: 'modal-age',
    loadChildren: () => import('./modal-age/modal-age.module').then( m => m.ModalAgePageModule)
  },
  {
    path: 'modal-interest',
    loadChildren: () => import('./modal-interest/modal-interest.module').then( m => m.ModalInterestPageModule)
  },
  {
    path: 'upload-photos',
    loadChildren: () => import('./upload-photos/upload-photos.module').then( m => m.UploadPhotosPageModule)
  },
  {
    path: 'user-modal-photos',
    loadChildren: () => import('./user-modal-photos/user-modal-photos.module').then( m => m.UserModalPhotosPageModule)
  },
  {
    path: 'user-modal-picture',
    loadChildren: () => import('./user-modal-picture/user-modal-picture.module').then( m => m.UserModalPicturePageModule)
  },
  {
    path: 'preview-image',
    loadChildren: () => import('./preview-image/preview-image.module').then( m => m.PreviewImagePageModule)
  },
  {
    path: 'add-location',
    loadChildren: () => import('./add-location/add-location.module').then( m => m.AddLocationPageModule)
  },
  {
    path: 'guest-feed-add',
    loadChildren: () => import('./guest-feed-add/guest-feed-add.module').then( m => m.GuestFeedAddPageModule)
  },
  {
    path: 'guest-feed-comment',
    loadChildren: () => import('./guest-feed-comment/guest-feed-comment.module').then( m => m.GuestFeedCommentPageModule)
  },
  {
    path: 'categories-modal',
    loadChildren: () => import('./categories-modal/categories-modal.module').then( m => m.CategoriesModalPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./announcement-details/announcement-details.module').then( m => m.AnnouncementDetailsPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'features-modal',
    loadChildren: () => import('./features-modal/features-modal.module').then( m => m.FeaturesModalPageModule)
  },
  {
    path: 'top-apps',
    loadChildren: () => import('./top-apps/top-apps.module').then( m => m.TopAppsPageModule)
  },
  {
    path: 'online-users',
    loadChildren: () => import('./online-users/online-users.module').then( m => m.OnlineUsersPageModule)
  },
  {
    path: 'listing-comment',
    loadChildren: () => import('./listing-comment/listing-comment.module').then( m => m.ListingCommentPageModule)
  },
  {
    path: 'jobs-comment',
    loadChildren: () => import('./jobs-comment/jobs-comment.module').then( m => m.JobsCommentPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
