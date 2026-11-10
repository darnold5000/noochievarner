-- Allow HitTrax league items in tenant_content_items.

alter table public.tenant_content_items drop constraint if exists tenant_content_items_content_type_check;

alter table public.tenant_content_items add constraint tenant_content_items_content_type_check check (
  content_type in (
    'tournament',
    'tournament_resource',
    'staff',
    'travel_team_coach',
    'business_staff',
    'training_offering',
    'program',
    'hittrax_league',
    'facility_section',
    'facility_stat',
    'homepage',
    'site_settings',
    'instructor',
    'lesson',
    'membership_display',
    'pro_shop_vendor',
    'pro_shop_settings',
    'nvba_service',
    'about_settings',
    'facility_settings',
    'facility_feature',
    'contact_settings',
    'contact_topic',
    'gallery_photo',
    'news_article',
    'sponsor',
    'services_intro'
  )
);

notify pgrst, 'reload schema';
