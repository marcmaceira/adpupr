import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_sitemap_priority" AS ENUM('1', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1');
  CREATE TYPE "public"."enum_pages_sitemap_change_frequency" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_sitemap_priority" AS ENUM('1', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1');
  CREATE TYPE "public"."enum__pages_v_version_sitemap_change_frequency" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'ai');
  CREATE TYPE "public"."enum_payload_llm_instructions_entity_type" AS ENUM('collection', 'global');
  CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum_header_cta_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum__header_v_version_nav_items_children_link_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum__header_v_version_nav_items_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum__header_v_version_nav_items_link_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum__header_v_version_cta_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum__footer_v_version_columns_links_link_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum_site_settings_social_profiles_network" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube');
  CREATE TYPE "public"."enum_site_settings_not_found_link_type" AS ENUM('internal', 'custom', 'email');
  CREATE TYPE "public"."enum__site_settings_v_version_social_profiles_network" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube');
  CREATE TYPE "public"."enum__site_settings_v_version_not_found_link_type" AS ENUM('internal', 'custom', 'email');
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"path" varchar,
  	"layout" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_og_description" varchar,
  	"meta_image_id" integer,
  	"noindex" boolean,
  	"sitemap_include" boolean DEFAULT true,
  	"sitemap_priority" "enum_pages_sitemap_priority" DEFAULT '0.7',
  	"sitemap_change_frequency" "enum_pages_sitemap_change_frequency" DEFAULT 'monthly',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_path" varchar,
  	"version_layout" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_image_id" integer,
  	"version_noindex" boolean,
  	"version_sitemap_include" boolean DEFAULT true,
  	"version_sitemap_priority" "enum__pages_v_version_sitemap_priority" DEFAULT '0.7',
  	"version_sitemap_change_frequency" "enum__pages_v_version_sitemap_change_frequency" DEFAULT 'monthly',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"portrait_id" integer,
  	"bio" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "people_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_people_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_portrait_id" integer,
  	"version_bio" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_people_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "committees_functions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "committees_editorial_board_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"person_id" integer NOT NULL,
  	"role" varchar NOT NULL,
  	"display_name" varchar
  );
  
  CREATE TABLE "committees_editorial_board_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "committees" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"focus" varchar,
  	"functions_label" varchar NOT NULL,
  	"coordinator_person_id" integer NOT NULL,
  	"coordinator_display_name" varchar,
  	"coordinator_role_label" varchar,
  	"editorial_board_title" varchar,
  	"editorial_board_summary" varchar,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "committees_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_committees_v_version_functions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_committees_v_version_editorial_board_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"person_id" integer NOT NULL,
  	"role" varchar NOT NULL,
  	"display_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_committees_v_version_editorial_board_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_committees_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_description" varchar NOT NULL,
  	"version_focus" varchar,
  	"version_functions_label" varchar NOT NULL,
  	"version_coordinator_person_id" integer NOT NULL,
  	"version_coordinator_display_name" varchar,
  	"version_coordinator_role_label" varchar,
  	"version_editorial_board_title" varchar,
  	"version_editorial_board_summary" varchar,
  	"version_order" numeric DEFAULT 1 NOT NULL,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_committees_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"sort_order" numeric,
  	"prefix" varchar DEFAULT 'cms/documents',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"_stored" boolean,
  	"_transforms" jsonb,
  	"original_filename" varchar,
  	"original_url" varchar,
  	"original_mime_type" varchar,
  	"original_filesize" numeric,
  	"original_width" numeric,
  	"original_height" numeric,
  	"original_prefix" varchar,
  	"original__objectkey" varchar,
  	"original__stored" boolean,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "document_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "document_categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"prefix" varchar DEFAULT 'cms/media',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"_stored" boolean,
  	"_transforms" jsonb,
  	"original_filename" varchar,
  	"original_url" varchar,
  	"original_mime_type" varchar,
  	"original_filesize" numeric,
  	"original_width" numeric,
  	"original_height" numeric,
  	"original_prefix" varchar,
  	"original__objectkey" varchar,
  	"original__stored" boolean,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"refresh_count" numeric,
  	"refreshed_at" timestamp(3) with time zone,
  	"label" varchar,
  	"type" varchar,
  	"metadata" jsonb
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"api_key" varchar,
  	"api_key_last4" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"people_id" integer,
  	"committees_id" integer,
  	"documents_id" integer,
  	"document_categories_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_llm_instructions" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entity_slug" varchar NOT NULL,
  	"entity_type" "enum_payload_llm_instructions_entity_type" NOT NULL,
  	"additional_instructions" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_llm_instructions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_anchor" varchar,
  	"link_url" varchar,
  	"link_email_subject" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_header_nav_items_type" DEFAULT 'link',
  	"link_label" varchar,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_anchor" varchar,
  	"link_url" varchar,
  	"link_email_subject" varchar,
  	"link_new_tab" boolean,
  	"label" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"home_aria_label" varchar NOT NULL,
  	"cta_label" varchar,
  	"cta_type" "enum_header_cta_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_anchor" varchar,
  	"cta_url" varchar,
  	"cta_email_subject" varchar,
  	"cta_new_tab" boolean,
  	"a11y_nav_label" varchar NOT NULL,
  	"a11y_mobile_nav_label" varchar NOT NULL,
  	"a11y_open_menu_label" varchar NOT NULL,
  	"a11y_close_menu_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_header_v_version_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum__header_v_version_nav_items_children_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_anchor" varchar,
  	"link_url" varchar,
  	"link_email_subject" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__header_v_version_nav_items_type" DEFAULT 'link',
  	"link_label" varchar,
  	"link_type" "enum__header_v_version_nav_items_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_anchor" varchar,
  	"link_url" varchar,
  	"link_email_subject" varchar,
  	"link_new_tab" boolean,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer NOT NULL,
  	"version_home_aria_label" varchar NOT NULL,
  	"version_cta_label" varchar,
  	"version_cta_type" "enum__header_v_version_cta_type" DEFAULT 'internal',
  	"version_cta_page_id" integer,
  	"version_cta_anchor" varchar,
  	"version_cta_url" varchar,
  	"version_cta_email_subject" varchar,
  	"version_cta_new_tab" boolean,
  	"version_a11y_nav_label" varchar NOT NULL,
  	"version_a11y_mobile_nav_label" varchar NOT NULL,
  	"version_a11y_open_menu_label" varchar NOT NULL,
  	"version_a11y_close_menu_label" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_header_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_anchor" varchar,
  	"link_url" varchar,
  	"link_email_subject" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"blurb" varchar NOT NULL,
  	"address_label" varchar NOT NULL,
  	"email_label" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_footer_v_version_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum__footer_v_version_columns_links_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_anchor" varchar,
  	"link_url" varchar,
  	"link_email_subject" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer NOT NULL,
  	"version_blurb" varchar NOT NULL,
  	"version_address_label" varchar NOT NULL,
  	"version_email_label" varchar NOT NULL,
  	"version_copyright" varchar NOT NULL,
  	"version_location" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_footer_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "site_settings_contact_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"network" "enum_site_settings_social_profiles_network" NOT NULL,
  	"label" varchar NOT NULL,
  	"handle" varchar,
  	"url" varchar NOT NULL,
  	"show_in_footer" boolean DEFAULT true
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organization_name" varchar NOT NULL,
  	"organization_short_name" varchar NOT NULL,
  	"contact_postal_line1" varchar NOT NULL,
  	"contact_postal_city" varchar NOT NULL,
  	"contact_postal_region" varchar NOT NULL,
  	"contact_postal_postal_code" varchar NOT NULL,
  	"contact_postal_country" varchar NOT NULL,
  	"payments_ath_movil_url" varchar NOT NULL,
  	"seo_site_name" varchar NOT NULL,
  	"seo_default_title" varchar NOT NULL,
  	"seo_title_suffix" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"seo_social_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_locale" varchar NOT NULL,
  	"seo_skip_link_label" varchar NOT NULL,
  	"not_found_eyebrow" varchar,
  	"not_found_title" varchar NOT NULL,
  	"not_found_text" varchar NOT NULL,
  	"not_found_link_label" varchar,
  	"not_found_link_type" "enum_site_settings_not_found_link_type" DEFAULT 'internal',
  	"not_found_link_page_id" integer,
  	"not_found_link_anchor" varchar,
  	"not_found_link_url" varchar,
  	"not_found_link_email_subject" varchar,
  	"not_found_link_new_tab" boolean,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_site_settings_v_version_contact_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"network" "enum__site_settings_v_version_social_profiles_network" NOT NULL,
  	"label" varchar NOT NULL,
  	"handle" varchar,
  	"url" varchar NOT NULL,
  	"show_in_footer" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_organization_name" varchar NOT NULL,
  	"version_organization_short_name" varchar NOT NULL,
  	"version_contact_postal_line1" varchar NOT NULL,
  	"version_contact_postal_city" varchar NOT NULL,
  	"version_contact_postal_region" varchar NOT NULL,
  	"version_contact_postal_postal_code" varchar NOT NULL,
  	"version_contact_postal_country" varchar NOT NULL,
  	"version_payments_ath_movil_url" varchar NOT NULL,
  	"version_seo_site_name" varchar NOT NULL,
  	"version_seo_default_title" varchar NOT NULL,
  	"version_seo_title_suffix" varchar NOT NULL,
  	"version_seo_description" varchar NOT NULL,
  	"version_seo_social_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_locale" varchar NOT NULL,
  	"version_seo_skip_link_label" varchar NOT NULL,
  	"version_not_found_eyebrow" varchar,
  	"version_not_found_title" varchar NOT NULL,
  	"version_not_found_text" varchar NOT NULL,
  	"version_not_found_link_label" varchar,
  	"version_not_found_link_type" "enum__site_settings_v_version_not_found_link_type" DEFAULT 'internal',
  	"version_not_found_link_page_id" integer,
  	"version_not_found_link_anchor" varchar,
  	"version_not_found_link_url" varchar,
  	"version_not_found_link_email_subject" varchar,
  	"version_not_found_link_new_tab" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_parent_id_people_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_portrait_id_media_id_fk" FOREIGN KEY ("version_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_functions" ADD CONSTRAINT "committees_functions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_editorial_board_members" ADD CONSTRAINT "committees_editorial_board_members_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "committees_editorial_board_members" ADD CONSTRAINT "committees_editorial_board_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_editorial_board_responsibilities" ADD CONSTRAINT "committees_editorial_board_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees" ADD CONSTRAINT "committees_coordinator_person_id_people_id_fk" FOREIGN KEY ("coordinator_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "committees_rels" ADD CONSTRAINT "committees_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_rels" ADD CONSTRAINT "committees_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_version_functions" ADD CONSTRAINT "_committees_v_version_functions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_version_editorial_board_members" ADD CONSTRAINT "_committees_v_version_editorial_board_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_version_editorial_board_members" ADD CONSTRAINT "_committees_v_version_editorial_board_members_perso_cce3440d_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_committees_v_version_editorial_board_responsibilities" ADD CONSTRAINT "_committees_v_version_editorial_board_responsibilit_07a6cff5_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v" ADD CONSTRAINT "_committees_v_parent_id_committees_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."committees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_committees_v" ADD CONSTRAINT "_committees_v_version_coordinator_person_id_people_id_fk" FOREIGN KEY ("version_coordinator_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_committees_v_rels" ADD CONSTRAINT "_committees_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_rels" ADD CONSTRAINT "_committees_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_category_id_document_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."document_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "document_categories_rels" ADD CONSTRAINT "document_categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."document_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "document_categories_rels" ADD CONSTRAINT "document_categories_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_committees_fk" FOREIGN KEY ("committees_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_document_categories_fk" FOREIGN KEY ("document_categories_id") REFERENCES "public"."document_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_llm_instructions_rels" ADD CONSTRAINT "payload_llm_instructions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_llm_instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_llm_instructions_rels" ADD CONSTRAINT "payload_llm_instructions_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items_children" ADD CONSTRAINT "_header_v_version_nav_items_children_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items_children" ADD CONSTRAINT "_header_v_version_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items" ADD CONSTRAINT "_header_v_version_nav_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items" ADD CONSTRAINT "_header_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_cta_page_id_pages_id_fk" FOREIGN KEY ("version_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_links" ADD CONSTRAINT "_footer_v_version_columns_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_links" ADD CONSTRAINT "_footer_v_version_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns" ADD CONSTRAINT "_footer_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_emails" ADD CONSTRAINT "site_settings_contact_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_profiles" ADD CONSTRAINT "site_settings_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_not_found_link_page_id_pages_id_fk" FOREIGN KEY ("not_found_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_contact_emails" ADD CONSTRAINT "_site_settings_v_version_contact_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social_profiles" ADD CONSTRAINT "_site_settings_v_version_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_not_found_link_page_id_pages_id_fk" FOREIGN KEY ("version_not_found_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_rels" ADD CONSTRAINT "_site_settings_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_rels" ADD CONSTRAINT "_site_settings_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_users_id_idx" ON "pages_rels" USING btree ("users_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_users_id_idx" ON "_pages_v_rels" USING btree ("users_id");
  CREATE INDEX "people_portrait_idx" ON "people" USING btree ("portrait_id");
  CREATE UNIQUE INDEX "people_slug_idx" ON "people" USING btree ("slug");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "people_rels_order_idx" ON "people_rels" USING btree ("order");
  CREATE INDEX "people_rels_parent_idx" ON "people_rels" USING btree ("parent_id");
  CREATE INDEX "people_rels_path_idx" ON "people_rels" USING btree ("path");
  CREATE INDEX "people_rels_users_id_idx" ON "people_rels" USING btree ("users_id");
  CREATE INDEX "_people_v_parent_idx" ON "_people_v" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_version_portrait_idx" ON "_people_v" USING btree ("version_portrait_id");
  CREATE INDEX "_people_v_version_version_slug_idx" ON "_people_v" USING btree ("version_slug");
  CREATE INDEX "_people_v_version_version_updated_at_idx" ON "_people_v" USING btree ("version_updated_at");
  CREATE INDEX "_people_v_version_version_created_at_idx" ON "_people_v" USING btree ("version_created_at");
  CREATE INDEX "_people_v_created_at_idx" ON "_people_v" USING btree ("created_at");
  CREATE INDEX "_people_v_updated_at_idx" ON "_people_v" USING btree ("updated_at");
  CREATE INDEX "_people_v_rels_order_idx" ON "_people_v_rels" USING btree ("order");
  CREATE INDEX "_people_v_rels_parent_idx" ON "_people_v_rels" USING btree ("parent_id");
  CREATE INDEX "_people_v_rels_path_idx" ON "_people_v_rels" USING btree ("path");
  CREATE INDEX "_people_v_rels_users_id_idx" ON "_people_v_rels" USING btree ("users_id");
  CREATE INDEX "committees_functions_order_idx" ON "committees_functions" USING btree ("_order");
  CREATE INDEX "committees_functions_parent_id_idx" ON "committees_functions" USING btree ("_parent_id");
  CREATE INDEX "committees_editorial_board_members_order_idx" ON "committees_editorial_board_members" USING btree ("_order");
  CREATE INDEX "committees_editorial_board_members_parent_id_idx" ON "committees_editorial_board_members" USING btree ("_parent_id");
  CREATE INDEX "committees_editorial_board_members_person_idx" ON "committees_editorial_board_members" USING btree ("person_id");
  CREATE INDEX "committees_editorial_board_responsibilities_order_idx" ON "committees_editorial_board_responsibilities" USING btree ("_order");
  CREATE INDEX "committees_editorial_board_responsibilities_parent_id_idx" ON "committees_editorial_board_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "committees_coordinator_coordinator_person_idx" ON "committees" USING btree ("coordinator_person_id");
  CREATE UNIQUE INDEX "committees_slug_idx" ON "committees" USING btree ("slug");
  CREATE INDEX "committees_updated_at_idx" ON "committees" USING btree ("updated_at");
  CREATE INDEX "committees_created_at_idx" ON "committees" USING btree ("created_at");
  CREATE INDEX "committees_rels_order_idx" ON "committees_rels" USING btree ("order");
  CREATE INDEX "committees_rels_parent_idx" ON "committees_rels" USING btree ("parent_id");
  CREATE INDEX "committees_rels_path_idx" ON "committees_rels" USING btree ("path");
  CREATE INDEX "committees_rels_users_id_idx" ON "committees_rels" USING btree ("users_id");
  CREATE INDEX "_committees_v_version_functions_order_idx" ON "_committees_v_version_functions" USING btree ("_order");
  CREATE INDEX "_committees_v_version_functions_parent_id_idx" ON "_committees_v_version_functions" USING btree ("_parent_id");
  CREATE INDEX "_committees_v_version_editorial_board_members_order_idx" ON "_committees_v_version_editorial_board_members" USING btree ("_order");
  CREATE INDEX "_committees_v_version_editorial_board_members_parent_id_idx" ON "_committees_v_version_editorial_board_members" USING btree ("_parent_id");
  CREATE INDEX "_committees_v_version_editorial_board_members_person_idx" ON "_committees_v_version_editorial_board_members" USING btree ("person_id");
  CREATE INDEX "_committees_v_version_editorial_board_responsibili_fdb70ae9_idx" ON "_committees_v_version_editorial_board_responsibilities" USING btree ("_order");
  CREATE INDEX "_committees_v_version_editorial_board_responsibili_966005c5_idx" ON "_committees_v_version_editorial_board_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "_committees_v_parent_idx" ON "_committees_v" USING btree ("parent_id");
  CREATE INDEX "_committees_v_version_coordinator_version_coordinator_pe_idx" ON "_committees_v" USING btree ("version_coordinator_person_id");
  CREATE INDEX "_committees_v_version_version_slug_idx" ON "_committees_v" USING btree ("version_slug");
  CREATE INDEX "_committees_v_version_version_updated_at_idx" ON "_committees_v" USING btree ("version_updated_at");
  CREATE INDEX "_committees_v_version_version_created_at_idx" ON "_committees_v" USING btree ("version_created_at");
  CREATE INDEX "_committees_v_created_at_idx" ON "_committees_v" USING btree ("created_at");
  CREATE INDEX "_committees_v_updated_at_idx" ON "_committees_v" USING btree ("updated_at");
  CREATE INDEX "_committees_v_rels_order_idx" ON "_committees_v_rels" USING btree ("order");
  CREATE INDEX "_committees_v_rels_parent_idx" ON "_committees_v_rels" USING btree ("parent_id");
  CREATE INDEX "_committees_v_rels_path_idx" ON "_committees_v_rels" USING btree ("path");
  CREATE INDEX "_committees_v_rels_users_id_idx" ON "_committees_v_rels" USING btree ("users_id");
  CREATE INDEX "documents_category_idx" ON "documents" USING btree ("category_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "documents_original_original_filename_idx" ON "documents" USING btree ("original_filename");
  CREATE INDEX "documents_rels_order_idx" ON "documents_rels" USING btree ("order");
  CREATE INDEX "documents_rels_parent_idx" ON "documents_rels" USING btree ("parent_id");
  CREATE INDEX "documents_rels_path_idx" ON "documents_rels" USING btree ("path");
  CREATE INDEX "documents_rels_users_id_idx" ON "documents_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "document_categories_slug_idx" ON "document_categories" USING btree ("slug");
  CREATE INDEX "document_categories_updated_at_idx" ON "document_categories" USING btree ("updated_at");
  CREATE INDEX "document_categories_created_at_idx" ON "document_categories" USING btree ("created_at");
  CREATE INDEX "document_categories_rels_order_idx" ON "document_categories_rels" USING btree ("order");
  CREATE INDEX "document_categories_rels_parent_idx" ON "document_categories_rels" USING btree ("parent_id");
  CREATE INDEX "document_categories_rels_path_idx" ON "document_categories_rels" USING btree ("path");
  CREATE INDEX "document_categories_rels_users_id_idx" ON "document_categories_rels" USING btree ("users_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_original_original_filename_idx" ON "media" USING btree ("original_filename");
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_users_id_idx" ON "media_rels" USING btree ("users_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_users_id_idx" ON "users_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_committees_id_idx" ON "payload_locked_documents_rels" USING btree ("committees_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_document_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("document_categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "payload_llm_instructions_entity_slug_idx" ON "payload_llm_instructions" USING btree ("entity_slug");
  CREATE INDEX "payload_llm_instructions_updated_at_idx" ON "payload_llm_instructions" USING btree ("updated_at");
  CREATE INDEX "payload_llm_instructions_created_at_idx" ON "payload_llm_instructions" USING btree ("created_at");
  CREATE INDEX "payload_llm_instructions_rels_order_idx" ON "payload_llm_instructions_rels" USING btree ("order");
  CREATE INDEX "payload_llm_instructions_rels_parent_idx" ON "payload_llm_instructions_rels" USING btree ("parent_id");
  CREATE INDEX "payload_llm_instructions_rels_path_idx" ON "payload_llm_instructions_rels" USING btree ("path");
  CREATE INDEX "payload_llm_instructions_rels_users_id_idx" ON "payload_llm_instructions_rels" USING btree ("users_id");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_link_link_page_idx" ON "header_nav_items_children" USING btree ("link_page_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_link_link_page_idx" ON "header_nav_items" USING btree ("link_page_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_cta_cta_page_idx" ON "header" USING btree ("cta_page_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_users_id_idx" ON "header_rels" USING btree ("users_id");
  CREATE INDEX "_header_v_version_nav_items_children_order_idx" ON "_header_v_version_nav_items_children" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_children_parent_id_idx" ON "_header_v_version_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_nav_items_children_link_link_page_idx" ON "_header_v_version_nav_items_children" USING btree ("link_page_id");
  CREATE INDEX "_header_v_version_nav_items_order_idx" ON "_header_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_parent_id_idx" ON "_header_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_nav_items_link_link_page_idx" ON "_header_v_version_nav_items" USING btree ("link_page_id");
  CREATE INDEX "_header_v_version_version_logo_idx" ON "_header_v" USING btree ("version_logo_id");
  CREATE INDEX "_header_v_version_cta_version_cta_page_idx" ON "_header_v" USING btree ("version_cta_page_id");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_rels_order_idx" ON "_header_v_rels" USING btree ("order");
  CREATE INDEX "_header_v_rels_parent_idx" ON "_header_v_rels" USING btree ("parent_id");
  CREATE INDEX "_header_v_rels_path_idx" ON "_header_v_rels" USING btree ("path");
  CREATE INDEX "_header_v_rels_users_id_idx" ON "_header_v_rels" USING btree ("users_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_link_link_page_idx" ON "footer_columns_links" USING btree ("link_page_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_users_id_idx" ON "footer_rels" USING btree ("users_id");
  CREATE INDEX "_footer_v_version_columns_links_order_idx" ON "_footer_v_version_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_links_parent_id_idx" ON "_footer_v_version_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_columns_links_link_link_page_idx" ON "_footer_v_version_columns_links" USING btree ("link_page_id");
  CREATE INDEX "_footer_v_version_columns_order_idx" ON "_footer_v_version_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_parent_id_idx" ON "_footer_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_version_logo_idx" ON "_footer_v" USING btree ("version_logo_id");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_rels_order_idx" ON "_footer_v_rels" USING btree ("order");
  CREATE INDEX "_footer_v_rels_parent_idx" ON "_footer_v_rels" USING btree ("parent_id");
  CREATE INDEX "_footer_v_rels_path_idx" ON "_footer_v_rels" USING btree ("path");
  CREATE INDEX "_footer_v_rels_users_id_idx" ON "_footer_v_rels" USING btree ("users_id");
  CREATE INDEX "site_settings_contact_emails_order_idx" ON "site_settings_contact_emails" USING btree ("_order");
  CREATE INDEX "site_settings_contact_emails_parent_id_idx" ON "site_settings_contact_emails" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_profiles_order_idx" ON "site_settings_social_profiles" USING btree ("_order");
  CREATE INDEX "site_settings_social_profiles_parent_id_idx" ON "site_settings_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_seo_og_image_idx" ON "site_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "site_settings_not_found_link_not_found_link_page_idx" ON "site_settings" USING btree ("not_found_link_page_id");
  CREATE INDEX "site_settings_rels_order_idx" ON "site_settings_rels" USING btree ("order");
  CREATE INDEX "site_settings_rels_parent_idx" ON "site_settings_rels" USING btree ("parent_id");
  CREATE INDEX "site_settings_rels_path_idx" ON "site_settings_rels" USING btree ("path");
  CREATE INDEX "site_settings_rels_users_id_idx" ON "site_settings_rels" USING btree ("users_id");
  CREATE INDEX "_site_settings_v_version_contact_emails_order_idx" ON "_site_settings_v_version_contact_emails" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_contact_emails_parent_id_idx" ON "_site_settings_v_version_contact_emails" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_social_profiles_order_idx" ON "_site_settings_v_version_social_profiles" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_social_profiles_parent_id_idx" ON "_site_settings_v_version_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_seo_version_seo_og_image_idx" ON "_site_settings_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_site_settings_v_version_not_found_link_version_not_foun_idx" ON "_site_settings_v" USING btree ("version_not_found_link_page_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_rels_order_idx" ON "_site_settings_v_rels" USING btree ("order");
  CREATE INDEX "_site_settings_v_rels_parent_idx" ON "_site_settings_v_rels" USING btree ("parent_id");
  CREATE INDEX "_site_settings_v_rels_path_idx" ON "_site_settings_v_rels" USING btree ("path");
  CREATE INDEX "_site_settings_v_rels_users_id_idx" ON "_site_settings_v_rels" USING btree ("users_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "people_rels" CASCADE;
  DROP TABLE "_people_v" CASCADE;
  DROP TABLE "_people_v_rels" CASCADE;
  DROP TABLE "committees_functions" CASCADE;
  DROP TABLE "committees_editorial_board_members" CASCADE;
  DROP TABLE "committees_editorial_board_responsibilities" CASCADE;
  DROP TABLE "committees" CASCADE;
  DROP TABLE "committees_rels" CASCADE;
  DROP TABLE "_committees_v_version_functions" CASCADE;
  DROP TABLE "_committees_v_version_editorial_board_members" CASCADE;
  DROP TABLE "_committees_v_version_editorial_board_responsibilities" CASCADE;
  DROP TABLE "_committees_v" CASCADE;
  DROP TABLE "_committees_v_rels" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_rels" CASCADE;
  DROP TABLE "document_categories" CASCADE;
  DROP TABLE "document_categories_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "payload_llm_instructions" CASCADE;
  DROP TABLE "payload_llm_instructions_rels" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "_header_v_version_nav_items_children" CASCADE;
  DROP TABLE "_header_v_version_nav_items" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "_header_v_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "_footer_v_version_columns_links" CASCADE;
  DROP TABLE "_footer_v_version_columns" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_footer_v_rels" CASCADE;
  DROP TABLE "site_settings_contact_emails" CASCADE;
  DROP TABLE "site_settings_social_profiles" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_rels" CASCADE;
  DROP TABLE "_site_settings_v_version_contact_emails" CASCADE;
  DROP TABLE "_site_settings_v_version_social_profiles" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_rels" CASCADE;
  DROP TYPE "public"."enum_pages_sitemap_priority";
  DROP TYPE "public"."enum_pages_sitemap_change_frequency";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_sitemap_priority";
  DROP TYPE "public"."enum__pages_v_version_sitemap_change_frequency";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_payload_llm_instructions_entity_type";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_cta_type";
  DROP TYPE "public"."enum__header_v_version_nav_items_children_link_type";
  DROP TYPE "public"."enum__header_v_version_nav_items_type";
  DROP TYPE "public"."enum__header_v_version_nav_items_link_type";
  DROP TYPE "public"."enum__header_v_version_cta_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_columns_links_link_type";
  DROP TYPE "public"."enum_site_settings_social_profiles_network";
  DROP TYPE "public"."enum_site_settings_not_found_link_type";
  DROP TYPE "public"."enum__site_settings_v_version_social_profiles_network";
  DROP TYPE "public"."enum__site_settings_v_version_not_found_link_type";`)
}
