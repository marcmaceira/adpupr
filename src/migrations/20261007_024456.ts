import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_page_hero_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_page_hero_title_size" AS ENUM('large', 'medium');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_split_content_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_split_content_style" AS ENUM('border', 'bar', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_content_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_numbered_list_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_numbered_list_layout" AS ENUM('stacked', 'split');
  CREATE TYPE "public"."enum_pages_blocks_numbered_grid_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_checklist_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_icon_list_items_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum_pages_blocks_icon_list_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_style" AS ENUM('cards', 'columns');
  CREATE TYPE "public"."enum_pages_blocks_stats_variant" AS ENUM('band', 'panel');
  CREATE TYPE "public"."enum_pages_blocks_media_block_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_style" AS ENUM('mustard', 'navy', 'navy-deep');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum_pages_blocks_pricing_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_pricing_callout_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum_signup_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_people_grid_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_people_grid_display" AS ENUM('bios', 'portraits');
  CREATE TYPE "public"."enum_pages_blocks_event_details_items_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum_pages_blocks_event_details_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_agenda_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum_pages_blocks_benefits_panel_items_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_page_hero_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_page_hero_title_size" AS ENUM('large', 'medium');
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_style" AS ENUM('border', 'bar', 'plain');
  CREATE TYPE "public"."enum__pages_v_blocks_content_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_numbered_list_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_numbered_list_layout" AS ENUM('stacked', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_numbered_grid_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_checklist_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_list_items_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_list_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_style" AS ENUM('cards', 'columns');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_variant" AS ENUM('band', 'panel');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_style" AS ENUM('mustard', 'navy', 'navy-deep');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_callout_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum__signup_v_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_people_grid_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_people_grid_display" AS ENUM('bios', 'portraits');
  CREATE TYPE "public"."enum__pages_v_blocks_event_details_items_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_event_details_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_agenda_background" AS ENUM('bg', 'surface', 'surface-2');
  CREATE TYPE "public"."enum__pages_v_blocks_benefits_panel_items_icon" AS ENUM('calendar', 'clock', 'map-pin', 'users', 'badge-check', 'presentation', 'file-text', 'file-chart', 'file-pen', 'book-open', 'library', 'utensils', 'coffee', 'store', 'heart-handshake', 'handshake', 'send', 'mail', 'smartphone', 'megaphone', 'graduation-cap', 'landmark', 'lightbulb', 'scale', 'globe', 'star');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_site_settings_social_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x');
  CREATE TYPE "public"."enum__site_settings_v_version_social_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x');
  CREATE TABLE "pages_blocks_page_hero_buttons" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "style" "enum_pages_blocks_page_hero_buttons_style" DEFAULT 'primary'
  );

  CREATE TABLE "pages_blocks_page_hero_side_links" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar
  );

  CREATE TABLE "pages_blocks_page_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "title" varchar,
    "title_size" "enum_pages_blocks_page_hero_title_size" DEFAULT 'large',
    "description" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_home_hero_buttons" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "style" "enum_pages_blocks_home_hero_buttons_style" DEFAULT 'primary'
  );

  CREATE TABLE "pages_blocks_home_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "highlight" varchar,
    "description" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_event_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "title" varchar,
    "theme_label" varchar DEFAULT 'Tema central',
    "theme" varchar,
    "date_number" varchar,
    "date_label" varchar,
    "detail" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_split_content" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_split_content_background" DEFAULT 'bg',
    "style" "enum_pages_blocks_split_content_style" DEFAULT 'border',
    "eyebrow" varchar,
    "heading" varchar,
    "body" jsonb,
    "link_label" varchar,
    "link_url" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_content" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_content_background" DEFAULT 'bg',
    "eyebrow" varchar,
    "heading" varchar,
    "body" jsonb,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_numbered_list_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar
  );

  CREATE TABLE "pages_blocks_numbered_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_numbered_list_background" DEFAULT 'bg',
    "layout" "enum_pages_blocks_numbered_list_layout" DEFAULT 'stacked',
    "eyebrow" varchar,
    "heading" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_numbered_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar,
    "description" varchar
  );

  CREATE TABLE "pages_blocks_numbered_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_numbered_grid_background" DEFAULT 'surface',
    "eyebrow" varchar,
    "heading" varchar,
    "intro" varchar,
    "number_prefix" varchar DEFAULT 'Eje',
    "description_prefix" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_feature_pair_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "text" varchar
  );

  CREATE TABLE "pages_blocks_feature_pair" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_checklist_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar
  );

  CREATE TABLE "pages_blocks_checklist" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_checklist_background" DEFAULT 'surface-2',
    "eyebrow" varchar,
    "heading" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_icon_list_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" "enum_pages_blocks_icon_list_items_icon",
    "title" varchar,
    "text" varchar,
    "emphasis" boolean
  );

  CREATE TABLE "pages_blocks_icon_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_icon_list_background" DEFAULT 'bg',
    "eyebrow" varchar,
    "heading" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_card_grid_cards" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" "enum_pages_blocks_card_grid_cards_icon",
    "eyebrow" varchar,
    "title" varchar,
    "description" varchar,
    "link_label" varchar,
    "link_url" varchar,
    "status" varchar,
    "dark" boolean
  );

  CREATE TABLE "pages_blocks_card_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_card_grid_background" DEFAULT 'bg',
    "style" "enum_pages_blocks_card_grid_style" DEFAULT 'cards',
    "eyebrow" varchar,
    "heading" varchar,
    "intro" varchar,
    "note" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "value" varchar,
    "suffix" varchar,
    "label" varchar
  );

  CREATE TABLE "pages_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "variant" "enum_pages_blocks_stats_variant" DEFAULT 'band',
    "eyebrow" varchar,
    "heading" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_media_block" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_media_block_background" DEFAULT 'bg',
    "image_id" integer,
    "caption" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_video" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "description" varchar,
    "video_url" varchar,
    "channel_label" varchar,
    "channel_url" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_cta_band_buttons" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "style" "enum_pages_blocks_cta_band_buttons_style" DEFAULT 'primary'
  );

  CREATE TABLE "pages_blocks_cta_band" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "style" "enum_pages_blocks_cta_band_style" DEFAULT 'mustard',
    "icon" "enum_pages_blocks_cta_band_icon",
    "eyebrow" varchar,
    "heading" varchar,
    "highlight" varchar,
    "description" varchar,
    "meta_date" varchar,
    "meta_location" varchar,
    "meta_format" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_pricing_plans" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "name" varchar,
    "price" varchar,
    "note" varchar,
    "button_label" varchar,
    "url" varchar,
    "featured" boolean,
    "badge" varchar
  );

  CREATE TABLE "pages_blocks_pricing" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_pricing_background" DEFAULT 'surface',
    "eyebrow" varchar,
    "heading" varchar,
    "intro" varchar,
    "callout_icon" "enum_pages_blocks_pricing_callout_icon",
    "callout_title" varchar,
    "callout_text" varchar,
    "callout_link_label" varchar,
    "callout_link_url" varchar,
    "footnote" varchar,
    "anchor" varchar DEFAULT 'inscripcion',
    "block_name" varchar
  );

  CREATE TABLE "signup_payment_step_methods_options" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "price" varchar,
    "url" varchar
  );

  CREATE TABLE "signup_payment_step_methods" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar,
    "description" varchar,
    "link_label" varchar,
    "link_url" varchar,
    "show_postal_address" boolean
  );

  CREATE TABLE "signup" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_signup_background" DEFAULT 'surface-2',
    "form_step_eyebrow" varchar,
    "form_step_heading" varchar,
    "form_step_text" varchar,
    "form_step_link_label" varchar,
    "form_step_link_url" varchar,
    "form_step_note_title" varchar,
    "form_step_note_text" varchar,
    "payment_step_eyebrow" varchar,
    "payment_step_heading" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_contact_section" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "body" jsonb,
    "form_eyebrow" varchar,
    "form_heading" varchar,
    "form_note" varchar DEFAULT 'El formulario no almacena tus datos.',
    "form_button_label" varchar DEFAULT 'Enviar correo',
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_people_grid_people" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "name" varchar,
    "role" varchar,
    "photo_id" integer,
    "bio" varchar
  );

  CREATE TABLE "pages_blocks_people_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_people_grid_background" DEFAULT 'bg',
    "display" "enum_pages_blocks_people_grid_display" DEFAULT 'bios',
    "eyebrow" varchar,
    "heading" varchar,
    "description" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_committee_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "description" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_resource_library" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "body" jsonb,
    "anchor" varchar DEFAULT 'publicaciones',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_event_details_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" "enum_pages_blocks_event_details_items_icon",
    "label" varchar,
    "value" varchar
  );

  CREATE TABLE "pages_blocks_event_details" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_event_details_background" DEFAULT 'bg',
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_agenda_periods_entries" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "start" varchar,
    "end" varchar,
    "title" varchar,
    "description" varchar,
    "minor" boolean
  );

  CREATE TABLE "pages_blocks_agenda_periods" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar,
    "subtitle" varchar
  );

  CREATE TABLE "pages_blocks_agenda" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "background" "enum_pages_blocks_agenda_background" DEFAULT 'bg',
    "heading" varchar DEFAULT 'Agenda del día',
    "footnote" varchar DEFAULT 'Programa sujeto a ajustes.',
    "link_label" varchar,
    "link_url" varchar,
    "anchor" varchar DEFAULT 'agenda',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_benefits_panel_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" "enum_pages_blocks_benefits_panel_items_icon",
    "title" varchar,
    "detail" varchar
  );

  CREATE TABLE "pages_blocks_benefits_panel" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "highlight_label" varchar,
    "highlight_value" varchar,
    "highlight_text" varchar,
    "note" varchar,
    "anchor" varchar,
    "block_name" varchar
  );

  CREATE TABLE "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "slug" varchar,
    "meta_title" varchar,
    "meta_description" varchar,
    "meta_image_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "deleted_at" timestamp(3) with time zone,
    "_status" "enum_pages_status" DEFAULT 'draft'
  );

  CREATE TABLE "pages_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "committees_id" integer
  );

  CREATE TABLE "_pages_v_blocks_page_hero_buttons" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "style" "enum__pages_v_blocks_page_hero_buttons_style" DEFAULT 'primary',
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_page_hero_side_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_page_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "title" varchar,
    "title_size" "enum__pages_v_blocks_page_hero_title_size" DEFAULT 'large',
    "description" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_home_hero_buttons" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "style" "enum__pages_v_blocks_home_hero_buttons_style" DEFAULT 'primary',
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_home_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "highlight" varchar,
    "description" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_event_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "title" varchar,
    "theme_label" varchar DEFAULT 'Tema central',
    "theme" varchar,
    "date_number" varchar,
    "date_label" varchar,
    "detail" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_split_content" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_split_content_background" DEFAULT 'bg',
    "style" "enum__pages_v_blocks_split_content_style" DEFAULT 'border',
    "eyebrow" varchar,
    "heading" varchar,
    "body" jsonb,
    "link_label" varchar,
    "link_url" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_content" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_content_background" DEFAULT 'bg',
    "eyebrow" varchar,
    "heading" varchar,
    "body" jsonb,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_numbered_list_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "text" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_numbered_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_numbered_list_background" DEFAULT 'bg',
    "layout" "enum__pages_v_blocks_numbered_list_layout" DEFAULT 'stacked',
    "eyebrow" varchar,
    "heading" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_numbered_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "description" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_numbered_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_numbered_grid_background" DEFAULT 'surface',
    "eyebrow" varchar,
    "heading" varchar,
    "intro" varchar,
    "number_prefix" varchar DEFAULT 'Eje',
    "description_prefix" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_feature_pair_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "text" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_feature_pair" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_checklist_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "text" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_checklist" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_checklist_background" DEFAULT 'surface-2',
    "eyebrow" varchar,
    "heading" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_icon_list_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "icon" "enum__pages_v_blocks_icon_list_items_icon",
    "title" varchar,
    "text" varchar,
    "emphasis" boolean,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_icon_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_icon_list_background" DEFAULT 'bg',
    "eyebrow" varchar,
    "heading" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "icon" "enum__pages_v_blocks_card_grid_cards_icon",
    "eyebrow" varchar,
    "title" varchar,
    "description" varchar,
    "link_label" varchar,
    "link_url" varchar,
    "status" varchar,
    "dark" boolean,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_card_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_card_grid_background" DEFAULT 'bg',
    "style" "enum__pages_v_blocks_card_grid_style" DEFAULT 'cards',
    "eyebrow" varchar,
    "heading" varchar,
    "intro" varchar,
    "note" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "value" varchar,
    "suffix" varchar,
    "label" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "variant" "enum__pages_v_blocks_stats_variant" DEFAULT 'band',
    "eyebrow" varchar,
    "heading" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_media_block" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_media_block_background" DEFAULT 'bg',
    "image_id" integer,
    "caption" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_video" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "description" varchar,
    "video_url" varchar,
    "channel_label" varchar,
    "channel_url" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_cta_band_buttons" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "style" "enum__pages_v_blocks_cta_band_buttons_style" DEFAULT 'primary',
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_cta_band" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "style" "enum__pages_v_blocks_cta_band_style" DEFAULT 'mustard',
    "icon" "enum__pages_v_blocks_cta_band_icon",
    "eyebrow" varchar,
    "heading" varchar,
    "highlight" varchar,
    "description" varchar,
    "meta_date" varchar,
    "meta_location" varchar,
    "meta_format" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_pricing_plans" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "price" varchar,
    "note" varchar,
    "button_label" varchar,
    "url" varchar,
    "featured" boolean,
    "badge" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_pricing" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_pricing_background" DEFAULT 'surface',
    "eyebrow" varchar,
    "heading" varchar,
    "intro" varchar,
    "callout_icon" "enum__pages_v_blocks_pricing_callout_icon",
    "callout_title" varchar,
    "callout_text" varchar,
    "callout_link_label" varchar,
    "callout_link_url" varchar,
    "footnote" varchar,
    "anchor" varchar DEFAULT 'inscripcion',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_signup_v_payment_step_methods_options" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "price" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_signup_v_payment_step_methods" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "description" varchar,
    "link_label" varchar,
    "link_url" varchar,
    "show_postal_address" boolean,
    "_uuid" varchar
  );

  CREATE TABLE "_signup_v" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__signup_v_background" DEFAULT 'surface-2',
    "form_step_eyebrow" varchar,
    "form_step_heading" varchar,
    "form_step_text" varchar,
    "form_step_link_label" varchar,
    "form_step_link_url" varchar,
    "form_step_note_title" varchar,
    "form_step_note_text" varchar,
    "payment_step_eyebrow" varchar,
    "payment_step_heading" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_contact_section" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "body" jsonb,
    "form_eyebrow" varchar,
    "form_heading" varchar,
    "form_note" varchar DEFAULT 'El formulario no almacena tus datos.',
    "form_button_label" varchar DEFAULT 'Enviar correo',
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_people_grid_people" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "role" varchar,
    "photo_id" integer,
    "bio" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_people_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_people_grid_background" DEFAULT 'bg',
    "display" "enum__pages_v_blocks_people_grid_display" DEFAULT 'bios',
    "eyebrow" varchar,
    "heading" varchar,
    "description" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_committee_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "description" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_resource_library" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "body" jsonb,
    "anchor" varchar DEFAULT 'publicaciones',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_event_details_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "icon" "enum__pages_v_blocks_event_details_items_icon",
    "label" varchar,
    "value" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_event_details" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_event_details_background" DEFAULT 'bg',
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_agenda_periods_entries" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "start" varchar,
    "end" varchar,
    "title" varchar,
    "description" varchar,
    "minor" boolean,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_agenda_periods" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "subtitle" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_agenda" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "background" "enum__pages_v_blocks_agenda_background" DEFAULT 'bg',
    "heading" varchar DEFAULT 'Agenda del día',
    "footnote" varchar DEFAULT 'Programa sujeto a ajustes.',
    "link_label" varchar,
    "link_url" varchar,
    "anchor" varchar DEFAULT 'agenda',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_benefits_panel_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "icon" "enum__pages_v_blocks_benefits_panel_items_icon",
    "title" varchar,
    "detail" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_benefits_panel" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "heading" varchar,
    "highlight_label" varchar,
    "highlight_value" varchar,
    "highlight_text" varchar,
    "note" varchar,
    "anchor" varchar,
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar,
    "version_slug" varchar,
    "version_meta_title" varchar,
    "version_meta_description" varchar,
    "version_meta_image_id" integer,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version_deleted_at" timestamp(3) with time zone,
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
    "committees_id" integer
  );

  CREATE TABLE "committees_functions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

  CREATE TABLE "committees_board_members" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "role" varchar NOT NULL
  );

  CREATE TABLE "committees_board_responsibilities" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

  CREATE TABLE "committees" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" varchar,
    "name" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "description" varchar NOT NULL,
    "focus" varchar,
    "functions_label" varchar DEFAULT 'Funciones' NOT NULL,
    "board_title" varchar DEFAULT 'Junta Editora',
    "board_summary" varchar,
    "coordinator_name" varchar NOT NULL,
    "coordinator_photo_id" integer,
    "coordinator_bio" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "_committees_v_version_functions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_committees_v_version_board_members" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "role" varchar NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_committees_v_version_board_responsibilities" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_committees_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version__order" varchar,
    "version_name" varchar NOT NULL,
    "version_slug" varchar NOT NULL,
    "version_description" varchar NOT NULL,
    "version_focus" varchar,
    "version_functions_label" varchar DEFAULT 'Funciones' NOT NULL,
    "version_board_title" varchar DEFAULT 'Junta Editora',
    "version_board_summary" varchar,
    "version_coordinator_name" varchar NOT NULL,
    "version_coordinator_photo_id" integer,
    "version_coordinator_bio" varchar NOT NULL,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "source_url" varchar,
    "title" varchar NOT NULL,
    "category_id" integer NOT NULL,
    "published_at" timestamp(3) with time zone NOT NULL,
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
    "focal_x" numeric,
    "focal_y" numeric
  );

  CREATE TABLE "document_categories" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" varchar,
    "source_slug" varchar,
    "title" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "source_url" varchar,
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
    "focal_x" numeric,
    "focal_y" numeric,
    "sizes_thumbnail_url" varchar,
    "sizes_thumbnail_width" numeric,
    "sizes_thumbnail_height" numeric,
    "sizes_thumbnail_mime_type" varchar,
    "sizes_thumbnail_filesize" numeric,
    "sizes_thumbnail_filename" varchar,
    "sizes_card_url" varchar,
    "sizes_card_width" numeric,
    "sizes_card_height" numeric,
    "sizes_card_mime_type" varchar,
    "sizes_card_filesize" numeric,
    "sizes_card_filename" varchar
  );

  CREATE TABLE "users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "created_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "role" "enum_users_role" DEFAULT 'editor' NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "reset_password_requested_at" timestamp(3) with time zone,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
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

  CREATE TABLE "header_nav_items_children" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "url" varchar NOT NULL
  );

  CREATE TABLE "header_nav_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar
  );

  CREATE TABLE "header" (
    "id" serial PRIMARY KEY NOT NULL,
    "cta_label" varchar,
    "cta_url" varchar,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_header_v_version_nav_items_children" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "url" varchar NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_header_v_version_nav_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_header_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_cta_label" varchar,
    "version_cta_url" varchar,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "footer_columns_links" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "url" varchar NOT NULL
  );

  CREATE TABLE "footer_columns" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "heading" varchar NOT NULL
  );

  CREATE TABLE "footer" (
    "id" serial PRIMARY KEY NOT NULL,
    "description" varchar,
    "copyright" varchar DEFAULT 'ADPUPR · Todos los derechos reservados',
    "location" varchar DEFAULT 'San Juan, Puerto Rico',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_footer_v_version_columns_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "url" varchar NOT NULL,
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
    "version_description" varchar,
    "version_copyright" varchar DEFAULT 'ADPUPR · Todos los derechos reservados',
    "version_location" varchar DEFAULT 'San Juan, Puerto Rico',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "site_settings_emails" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "email" varchar NOT NULL
  );

  CREATE TABLE "site_settings_social" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "platform" "enum_site_settings_social_platform" NOT NULL,
    "handle" varchar,
    "url" varchar NOT NULL
  );

  CREATE TABLE "site_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "organization_name" varchar DEFAULT 'Asociación de Administración Pública de Puerto Rico' NOT NULL,
    "site_title" varchar NOT NULL,
    "site_description" varchar NOT NULL,
    "share_image_id" integer,
    "postal_address_street" varchar NOT NULL,
    "postal_address_city" varchar NOT NULL,
    "postal_address_region" varchar DEFAULT 'PR' NOT NULL,
    "postal_address_postal_code" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_site_settings_v_version_emails" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "email" varchar NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_site_settings_v_version_social" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "platform" "enum__site_settings_v_version_social_platform" NOT NULL,
    "handle" varchar,
    "url" varchar NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_site_settings_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_organization_name" varchar DEFAULT 'Asociación de Administración Pública de Puerto Rico' NOT NULL,
    "version_site_title" varchar NOT NULL,
    "version_site_description" varchar NOT NULL,
    "version_share_image_id" integer,
    "version_postal_address_street" varchar NOT NULL,
    "version_postal_address_city" varchar NOT NULL,
    "version_postal_address_region" varchar DEFAULT 'PR' NOT NULL,
    "version_postal_address_postal_code" varchar NOT NULL,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "pages_blocks_page_hero_buttons" ADD CONSTRAINT "pages_blocks_page_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero_side_links" ADD CONSTRAINT "pages_blocks_page_hero_side_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_buttons" ADD CONSTRAINT "pages_blocks_home_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_hero" ADD CONSTRAINT "pages_blocks_event_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_list_items" ADD CONSTRAINT "pages_blocks_numbered_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbered_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_list" ADD CONSTRAINT "pages_blocks_numbered_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_grid_items" ADD CONSTRAINT "pages_blocks_numbered_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbered_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_grid" ADD CONSTRAINT "pages_blocks_numbered_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_pair_items" ADD CONSTRAINT "pages_blocks_feature_pair_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_pair"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_pair" ADD CONSTRAINT "pages_blocks_feature_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checklist_items" ADD CONSTRAINT "pages_blocks_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checklist" ADD CONSTRAINT "pages_blocks_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list_items" ADD CONSTRAINT "pages_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list" ADD CONSTRAINT "pages_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band_buttons" ADD CONSTRAINT "pages_blocks_cta_band_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans" ADD CONSTRAINT "pages_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "signup_payment_step_methods_options" ADD CONSTRAINT "signup_payment_step_methods_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."signup_payment_step_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "signup_payment_step_methods" ADD CONSTRAINT "signup_payment_step_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."signup"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "signup" ADD CONSTRAINT "signup_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section" ADD CONSTRAINT "pages_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_people_grid_people" ADD CONSTRAINT "pages_blocks_people_grid_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_people_grid_people" ADD CONSTRAINT "pages_blocks_people_grid_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_people_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_people_grid" ADD CONSTRAINT "pages_blocks_people_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_committee_list" ADD CONSTRAINT "pages_blocks_committee_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_library" ADD CONSTRAINT "pages_blocks_resource_library_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_details_items" ADD CONSTRAINT "pages_blocks_event_details_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_event_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_details" ADD CONSTRAINT "pages_blocks_event_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agenda_periods_entries" ADD CONSTRAINT "pages_blocks_agenda_periods_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_agenda_periods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agenda_periods" ADD CONSTRAINT "pages_blocks_agenda_periods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_agenda"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agenda" ADD CONSTRAINT "pages_blocks_agenda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_panel_items" ADD CONSTRAINT "pages_blocks_benefits_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_panel" ADD CONSTRAINT "pages_blocks_benefits_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_committees_fk" FOREIGN KEY ("committees_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_page_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero_side_links" ADD CONSTRAINT "_pages_v_blocks_page_hero_side_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD CONSTRAINT "_pages_v_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_home_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_hero" ADD CONSTRAINT "_pages_v_blocks_event_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_list_items" ADD CONSTRAINT "_pages_v_blocks_numbered_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_numbered_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_list" ADD CONSTRAINT "_pages_v_blocks_numbered_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_grid_items" ADD CONSTRAINT "_pages_v_blocks_numbered_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_numbered_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_grid" ADD CONSTRAINT "_pages_v_blocks_numbered_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_pair_items" ADD CONSTRAINT "_pages_v_blocks_feature_pair_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_pair"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_pair" ADD CONSTRAINT "_pages_v_blocks_feature_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checklist_items" ADD CONSTRAINT "_pages_v_blocks_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checklist" ADD CONSTRAINT "_pages_v_blocks_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list_items" ADD CONSTRAINT "_pages_v_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list" ADD CONSTRAINT "_pages_v_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band_buttons" ADD CONSTRAINT "_pages_v_blocks_cta_band_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_signup_v_payment_step_methods_options" ADD CONSTRAINT "_signup_v_payment_step_methods_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_signup_v_payment_step_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_signup_v_payment_step_methods" ADD CONSTRAINT "_signup_v_payment_step_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_signup_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_signup_v" ADD CONSTRAINT "_signup_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD CONSTRAINT "_pages_v_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_people_grid_people" ADD CONSTRAINT "_pages_v_blocks_people_grid_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_people_grid_people" ADD CONSTRAINT "_pages_v_blocks_people_grid_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_people_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_people_grid" ADD CONSTRAINT "_pages_v_blocks_people_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_committee_list" ADD CONSTRAINT "_pages_v_blocks_committee_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_library" ADD CONSTRAINT "_pages_v_blocks_resource_library_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_details_items" ADD CONSTRAINT "_pages_v_blocks_event_details_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_event_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_details" ADD CONSTRAINT "_pages_v_blocks_event_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agenda_periods_entries" ADD CONSTRAINT "_pages_v_blocks_agenda_periods_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_agenda_periods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agenda_periods" ADD CONSTRAINT "_pages_v_blocks_agenda_periods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_agenda"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agenda" ADD CONSTRAINT "_pages_v_blocks_agenda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_panel_items" ADD CONSTRAINT "_pages_v_blocks_benefits_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_benefits_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_panel" ADD CONSTRAINT "_pages_v_blocks_benefits_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_committees_fk" FOREIGN KEY ("committees_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_functions" ADD CONSTRAINT "committees_functions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_board_members" ADD CONSTRAINT "committees_board_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_board_responsibilities" ADD CONSTRAINT "committees_board_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees" ADD CONSTRAINT "committees_coordinator_photo_id_media_id_fk" FOREIGN KEY ("coordinator_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_committees_v_version_functions" ADD CONSTRAINT "_committees_v_version_functions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_version_board_members" ADD CONSTRAINT "_committees_v_version_board_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_version_board_responsibilities" ADD CONSTRAINT "_committees_v_version_board_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v" ADD CONSTRAINT "_committees_v_parent_id_committees_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."committees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_committees_v" ADD CONSTRAINT "_committees_v_version_coordinator_photo_id_media_id_fk" FOREIGN KEY ("version_coordinator_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_category_id_document_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."document_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_committees_fk" FOREIGN KEY ("committees_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_document_categories_fk" FOREIGN KEY ("document_categories_id") REFERENCES "public"."document_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items_children" ADD CONSTRAINT "_header_v_version_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items" ADD CONSTRAINT "_header_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_links" ADD CONSTRAINT "_footer_v_version_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns" ADD CONSTRAINT "_footer_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_emails" ADD CONSTRAINT "site_settings_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_share_image_id_media_id_fk" FOREIGN KEY ("share_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_emails" ADD CONSTRAINT "_site_settings_v_version_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social" ADD CONSTRAINT "_site_settings_v_version_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_share_image_id_media_id_fk" FOREIGN KEY ("version_share_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_page_hero_buttons_order_idx" ON "pages_blocks_page_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_buttons_parent_id_idx" ON "pages_blocks_page_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_side_links_order_idx" ON "pages_blocks_page_hero_side_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_side_links_parent_id_idx" ON "pages_blocks_page_hero_side_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_order_idx" ON "pages_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_parent_id_idx" ON "pages_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_path_idx" ON "pages_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_buttons_order_idx" ON "pages_blocks_home_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_buttons_parent_id_idx" ON "pages_blocks_home_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_hero_order_idx" ON "pages_blocks_event_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_hero_parent_id_idx" ON "pages_blocks_event_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_hero_path_idx" ON "pages_blocks_event_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_content_order_idx" ON "pages_blocks_split_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_parent_id_idx" ON "pages_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_path_idx" ON "pages_blocks_split_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_numbered_list_items_order_idx" ON "pages_blocks_numbered_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_list_items_parent_id_idx" ON "pages_blocks_numbered_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_list_order_idx" ON "pages_blocks_numbered_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_list_parent_id_idx" ON "pages_blocks_numbered_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_list_path_idx" ON "pages_blocks_numbered_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_numbered_grid_items_order_idx" ON "pages_blocks_numbered_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_grid_items_parent_id_idx" ON "pages_blocks_numbered_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_grid_order_idx" ON "pages_blocks_numbered_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_grid_parent_id_idx" ON "pages_blocks_numbered_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_grid_path_idx" ON "pages_blocks_numbered_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_pair_items_order_idx" ON "pages_blocks_feature_pair_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_pair_items_parent_id_idx" ON "pages_blocks_feature_pair_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_pair_order_idx" ON "pages_blocks_feature_pair" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_pair_parent_id_idx" ON "pages_blocks_feature_pair" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_pair_path_idx" ON "pages_blocks_feature_pair" USING btree ("_path");
  CREATE INDEX "pages_blocks_checklist_items_order_idx" ON "pages_blocks_checklist_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_checklist_items_parent_id_idx" ON "pages_blocks_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_checklist_order_idx" ON "pages_blocks_checklist" USING btree ("_order");
  CREATE INDEX "pages_blocks_checklist_parent_id_idx" ON "pages_blocks_checklist" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_checklist_path_idx" ON "pages_blocks_checklist" USING btree ("_path");
  CREATE INDEX "pages_blocks_icon_list_items_order_idx" ON "pages_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_list_items_parent_id_idx" ON "pages_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_list_order_idx" ON "pages_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_list_parent_id_idx" ON "pages_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_list_path_idx" ON "pages_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_image_idx" ON "pages_blocks_media_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_band_buttons_order_idx" ON "pages_blocks_cta_band_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_buttons_parent_id_idx" ON "pages_blocks_cta_band_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_plans_order_idx" ON "pages_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plans_parent_id_idx" ON "pages_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "signup_payment_step_methods_options_order_idx" ON "signup_payment_step_methods_options" USING btree ("_order");
  CREATE INDEX "signup_payment_step_methods_options_parent_id_idx" ON "signup_payment_step_methods_options" USING btree ("_parent_id");
  CREATE INDEX "signup_payment_step_methods_order_idx" ON "signup_payment_step_methods" USING btree ("_order");
  CREATE INDEX "signup_payment_step_methods_parent_id_idx" ON "signup_payment_step_methods" USING btree ("_parent_id");
  CREATE INDEX "signup_order_idx" ON "signup" USING btree ("_order");
  CREATE INDEX "signup_parent_id_idx" ON "signup" USING btree ("_parent_id");
  CREATE INDEX "signup_path_idx" ON "signup" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_section_order_idx" ON "pages_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_parent_id_idx" ON "pages_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_path_idx" ON "pages_blocks_contact_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_people_grid_people_order_idx" ON "pages_blocks_people_grid_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_people_grid_people_parent_id_idx" ON "pages_blocks_people_grid_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_people_grid_people_photo_idx" ON "pages_blocks_people_grid_people" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_people_grid_order_idx" ON "pages_blocks_people_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_people_grid_parent_id_idx" ON "pages_blocks_people_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_people_grid_path_idx" ON "pages_blocks_people_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_committee_list_order_idx" ON "pages_blocks_committee_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_committee_list_parent_id_idx" ON "pages_blocks_committee_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_committee_list_path_idx" ON "pages_blocks_committee_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_resource_library_order_idx" ON "pages_blocks_resource_library" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_library_parent_id_idx" ON "pages_blocks_resource_library" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_library_path_idx" ON "pages_blocks_resource_library" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_details_items_order_idx" ON "pages_blocks_event_details_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_details_items_parent_id_idx" ON "pages_blocks_event_details_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_details_order_idx" ON "pages_blocks_event_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_details_parent_id_idx" ON "pages_blocks_event_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_details_path_idx" ON "pages_blocks_event_details" USING btree ("_path");
  CREATE INDEX "pages_blocks_agenda_periods_entries_order_idx" ON "pages_blocks_agenda_periods_entries" USING btree ("_order");
  CREATE INDEX "pages_blocks_agenda_periods_entries_parent_id_idx" ON "pages_blocks_agenda_periods_entries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agenda_periods_order_idx" ON "pages_blocks_agenda_periods" USING btree ("_order");
  CREATE INDEX "pages_blocks_agenda_periods_parent_id_idx" ON "pages_blocks_agenda_periods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agenda_order_idx" ON "pages_blocks_agenda" USING btree ("_order");
  CREATE INDEX "pages_blocks_agenda_parent_id_idx" ON "pages_blocks_agenda" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agenda_path_idx" ON "pages_blocks_agenda" USING btree ("_path");
  CREATE INDEX "pages_blocks_benefits_panel_items_order_idx" ON "pages_blocks_benefits_panel_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_panel_items_parent_id_idx" ON "pages_blocks_benefits_panel_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_panel_order_idx" ON "pages_blocks_benefits_panel" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_panel_parent_id_idx" ON "pages_blocks_benefits_panel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_panel_path_idx" ON "pages_blocks_benefits_panel" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_deleted_at_idx" ON "pages" USING btree ("deleted_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_committees_id_idx" ON "pages_rels" USING btree ("committees_id");
  CREATE INDEX "_pages_v_blocks_page_hero_buttons_order_idx" ON "_pages_v_blocks_page_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_buttons_parent_id_idx" ON "_pages_v_blocks_page_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_side_links_order_idx" ON "_pages_v_blocks_page_hero_side_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_side_links_parent_id_idx" ON "_pages_v_blocks_page_hero_side_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_order_idx" ON "_pages_v_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_parent_id_idx" ON "_pages_v_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_path_idx" ON "_pages_v_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_hero_buttons_order_idx" ON "_pages_v_blocks_home_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_buttons_parent_id_idx" ON "_pages_v_blocks_home_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_order_idx" ON "_pages_v_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_parent_id_idx" ON "_pages_v_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_path_idx" ON "_pages_v_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_hero_order_idx" ON "_pages_v_blocks_event_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_hero_parent_id_idx" ON "_pages_v_blocks_event_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_hero_path_idx" ON "_pages_v_blocks_event_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_content_order_idx" ON "_pages_v_blocks_split_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_parent_id_idx" ON "_pages_v_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_path_idx" ON "_pages_v_blocks_split_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_numbered_list_items_order_idx" ON "_pages_v_blocks_numbered_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbered_list_items_parent_id_idx" ON "_pages_v_blocks_numbered_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbered_list_order_idx" ON "_pages_v_blocks_numbered_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbered_list_parent_id_idx" ON "_pages_v_blocks_numbered_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbered_list_path_idx" ON "_pages_v_blocks_numbered_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_numbered_grid_items_order_idx" ON "_pages_v_blocks_numbered_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbered_grid_items_parent_id_idx" ON "_pages_v_blocks_numbered_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbered_grid_order_idx" ON "_pages_v_blocks_numbered_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbered_grid_parent_id_idx" ON "_pages_v_blocks_numbered_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbered_grid_path_idx" ON "_pages_v_blocks_numbered_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_pair_items_order_idx" ON "_pages_v_blocks_feature_pair_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_pair_items_parent_id_idx" ON "_pages_v_blocks_feature_pair_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_pair_order_idx" ON "_pages_v_blocks_feature_pair" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_pair_parent_id_idx" ON "_pages_v_blocks_feature_pair" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_pair_path_idx" ON "_pages_v_blocks_feature_pair" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_checklist_items_order_idx" ON "_pages_v_blocks_checklist_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_checklist_items_parent_id_idx" ON "_pages_v_blocks_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_checklist_order_idx" ON "_pages_v_blocks_checklist" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_checklist_parent_id_idx" ON "_pages_v_blocks_checklist" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_checklist_path_idx" ON "_pages_v_blocks_checklist" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_icon_list_items_order_idx" ON "_pages_v_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_list_items_parent_id_idx" ON "_pages_v_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_list_order_idx" ON "_pages_v_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_list_parent_id_idx" ON "_pages_v_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_list_path_idx" ON "_pages_v_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_image_idx" ON "_pages_v_blocks_media_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_band_buttons_order_idx" ON "_pages_v_blocks_cta_band_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_buttons_parent_id_idx" ON "_pages_v_blocks_cta_band_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_plans_order_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plans_parent_id_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_signup_v_payment_step_methods_options_order_idx" ON "_signup_v_payment_step_methods_options" USING btree ("_order");
  CREATE INDEX "_signup_v_payment_step_methods_options_parent_id_idx" ON "_signup_v_payment_step_methods_options" USING btree ("_parent_id");
  CREATE INDEX "_signup_v_payment_step_methods_order_idx" ON "_signup_v_payment_step_methods" USING btree ("_order");
  CREATE INDEX "_signup_v_payment_step_methods_parent_id_idx" ON "_signup_v_payment_step_methods" USING btree ("_parent_id");
  CREATE INDEX "_signup_v_order_idx" ON "_signup_v" USING btree ("_order");
  CREATE INDEX "_signup_v_parent_id_idx" ON "_signup_v" USING btree ("_parent_id");
  CREATE INDEX "_signup_v_path_idx" ON "_signup_v" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_section_order_idx" ON "_pages_v_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_section_parent_id_idx" ON "_pages_v_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_path_idx" ON "_pages_v_blocks_contact_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_people_grid_people_order_idx" ON "_pages_v_blocks_people_grid_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_people_grid_people_parent_id_idx" ON "_pages_v_blocks_people_grid_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_people_grid_people_photo_idx" ON "_pages_v_blocks_people_grid_people" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_people_grid_order_idx" ON "_pages_v_blocks_people_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_people_grid_parent_id_idx" ON "_pages_v_blocks_people_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_people_grid_path_idx" ON "_pages_v_blocks_people_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_committee_list_order_idx" ON "_pages_v_blocks_committee_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_committee_list_parent_id_idx" ON "_pages_v_blocks_committee_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_committee_list_path_idx" ON "_pages_v_blocks_committee_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_resource_library_order_idx" ON "_pages_v_blocks_resource_library" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_library_parent_id_idx" ON "_pages_v_blocks_resource_library" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_library_path_idx" ON "_pages_v_blocks_resource_library" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_details_items_order_idx" ON "_pages_v_blocks_event_details_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_details_items_parent_id_idx" ON "_pages_v_blocks_event_details_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_details_order_idx" ON "_pages_v_blocks_event_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_details_parent_id_idx" ON "_pages_v_blocks_event_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_details_path_idx" ON "_pages_v_blocks_event_details" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_agenda_periods_entries_order_idx" ON "_pages_v_blocks_agenda_periods_entries" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agenda_periods_entries_parent_id_idx" ON "_pages_v_blocks_agenda_periods_entries" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agenda_periods_order_idx" ON "_pages_v_blocks_agenda_periods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agenda_periods_parent_id_idx" ON "_pages_v_blocks_agenda_periods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agenda_order_idx" ON "_pages_v_blocks_agenda" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agenda_parent_id_idx" ON "_pages_v_blocks_agenda" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agenda_path_idx" ON "_pages_v_blocks_agenda" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_benefits_panel_items_order_idx" ON "_pages_v_blocks_benefits_panel_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_panel_items_parent_id_idx" ON "_pages_v_blocks_benefits_panel_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_panel_order_idx" ON "_pages_v_blocks_benefits_panel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_panel_parent_id_idx" ON "_pages_v_blocks_benefits_panel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_panel_path_idx" ON "_pages_v_blocks_benefits_panel" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version_deleted_at_idx" ON "_pages_v" USING btree ("version_deleted_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_committees_id_idx" ON "_pages_v_rels" USING btree ("committees_id");
  CREATE INDEX "committees_functions_order_idx" ON "committees_functions" USING btree ("_order");
  CREATE INDEX "committees_functions_parent_id_idx" ON "committees_functions" USING btree ("_parent_id");
  CREATE INDEX "committees_board_members_order_idx" ON "committees_board_members" USING btree ("_order");
  CREATE INDEX "committees_board_members_parent_id_idx" ON "committees_board_members" USING btree ("_parent_id");
  CREATE INDEX "committees_board_responsibilities_order_idx" ON "committees_board_responsibilities" USING btree ("_order");
  CREATE INDEX "committees_board_responsibilities_parent_id_idx" ON "committees_board_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "committees__order_idx" ON "committees" USING btree ("_order");
  CREATE UNIQUE INDEX "committees_slug_idx" ON "committees" USING btree ("slug");
  CREATE INDEX "committees_coordinator_coordinator_photo_idx" ON "committees" USING btree ("coordinator_photo_id");
  CREATE INDEX "committees_updated_at_idx" ON "committees" USING btree ("updated_at");
  CREATE INDEX "committees_created_at_idx" ON "committees" USING btree ("created_at");
  CREATE INDEX "_committees_v_version_functions_order_idx" ON "_committees_v_version_functions" USING btree ("_order");
  CREATE INDEX "_committees_v_version_functions_parent_id_idx" ON "_committees_v_version_functions" USING btree ("_parent_id");
  CREATE INDEX "_committees_v_version_board_members_order_idx" ON "_committees_v_version_board_members" USING btree ("_order");
  CREATE INDEX "_committees_v_version_board_members_parent_id_idx" ON "_committees_v_version_board_members" USING btree ("_parent_id");
  CREATE INDEX "_committees_v_version_board_responsibilities_order_idx" ON "_committees_v_version_board_responsibilities" USING btree ("_order");
  CREATE INDEX "_committees_v_version_board_responsibilities_parent_id_idx" ON "_committees_v_version_board_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "_committees_v_parent_idx" ON "_committees_v" USING btree ("parent_id");
  CREATE INDEX "_committees_v_version_version__order_idx" ON "_committees_v" USING btree ("version__order");
  CREATE INDEX "_committees_v_version_version_slug_idx" ON "_committees_v" USING btree ("version_slug");
  CREATE INDEX "_committees_v_version_coordinator_version_coordinator_ph_idx" ON "_committees_v" USING btree ("version_coordinator_photo_id");
  CREATE INDEX "_committees_v_version_version_updated_at_idx" ON "_committees_v" USING btree ("version_updated_at");
  CREATE INDEX "_committees_v_version_version_created_at_idx" ON "_committees_v" USING btree ("version_created_at");
  CREATE INDEX "_committees_v_created_at_idx" ON "_committees_v" USING btree ("created_at");
  CREATE INDEX "_committees_v_updated_at_idx" ON "_committees_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "documents_source_url_idx" ON "documents" USING btree ("source_url");
  CREATE INDEX "documents_category_idx" ON "documents" USING btree ("category_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "document_categories__order_idx" ON "document_categories" USING btree ("_order");
  CREATE UNIQUE INDEX "document_categories_source_slug_idx" ON "document_categories" USING btree ("source_slug");
  CREATE UNIQUE INDEX "document_categories_title_idx" ON "document_categories" USING btree ("title");
  CREATE INDEX "document_categories_updated_at_idx" ON "document_categories" USING btree ("updated_at");
  CREATE INDEX "document_categories_created_at_idx" ON "document_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_source_url_idx" ON "media" USING btree ("source_url");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
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
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_nav_items_children_order_idx" ON "_header_v_version_nav_items_children" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_children_parent_id_idx" ON "_header_v_version_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_nav_items_order_idx" ON "_header_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_parent_id_idx" ON "_header_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_columns_links_order_idx" ON "_footer_v_version_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_links_parent_id_idx" ON "_footer_v_version_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_columns_order_idx" ON "_footer_v_version_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_parent_id_idx" ON "_footer_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "site_settings_emails_order_idx" ON "site_settings_emails" USING btree ("_order");
  CREATE INDEX "site_settings_emails_parent_id_idx" ON "site_settings_emails" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_share_image_idx" ON "site_settings" USING btree ("share_image_id");
  CREATE INDEX "_site_settings_v_version_emails_order_idx" ON "_site_settings_v_version_emails" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_emails_parent_id_idx" ON "_site_settings_v_version_emails" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_social_order_idx" ON "_site_settings_v_version_social" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_social_parent_id_idx" ON "_site_settings_v_version_social" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version_share_image_idx" ON "_site_settings_v" USING btree ("version_share_image_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_page_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_page_hero_side_links" CASCADE;
  DROP TABLE "pages_blocks_page_hero" CASCADE;
  DROP TABLE "pages_blocks_home_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_event_hero" CASCADE;
  DROP TABLE "pages_blocks_split_content" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_numbered_list_items" CASCADE;
  DROP TABLE "pages_blocks_numbered_list" CASCADE;
  DROP TABLE "pages_blocks_numbered_grid_items" CASCADE;
  DROP TABLE "pages_blocks_numbered_grid" CASCADE;
  DROP TABLE "pages_blocks_feature_pair_items" CASCADE;
  DROP TABLE "pages_blocks_feature_pair" CASCADE;
  DROP TABLE "pages_blocks_checklist_items" CASCADE;
  DROP TABLE "pages_blocks_checklist" CASCADE;
  DROP TABLE "pages_blocks_icon_list_items" CASCADE;
  DROP TABLE "pages_blocks_icon_list" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "pages_blocks_cta_band_buttons" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "signup_payment_step_methods_options" CASCADE;
  DROP TABLE "signup_payment_step_methods" CASCADE;
  DROP TABLE "signup" CASCADE;
  DROP TABLE "pages_blocks_contact_section" CASCADE;
  DROP TABLE "pages_blocks_people_grid_people" CASCADE;
  DROP TABLE "pages_blocks_people_grid" CASCADE;
  DROP TABLE "pages_blocks_committee_list" CASCADE;
  DROP TABLE "pages_blocks_resource_library" CASCADE;
  DROP TABLE "pages_blocks_event_details_items" CASCADE;
  DROP TABLE "pages_blocks_event_details" CASCADE;
  DROP TABLE "pages_blocks_agenda_periods_entries" CASCADE;
  DROP TABLE "pages_blocks_agenda_periods" CASCADE;
  DROP TABLE "pages_blocks_agenda" CASCADE;
  DROP TABLE "pages_blocks_benefits_panel_items" CASCADE;
  DROP TABLE "pages_blocks_benefits_panel" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero_side_links" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_event_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_numbered_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_numbered_list" CASCADE;
  DROP TABLE "_pages_v_blocks_numbered_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_numbered_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_pair_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_pair" CASCADE;
  DROP TABLE "_pages_v_blocks_checklist_items" CASCADE;
  DROP TABLE "_pages_v_blocks_checklist" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_list" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_signup_v_payment_step_methods_options" CASCADE;
  DROP TABLE "_signup_v_payment_step_methods" CASCADE;
  DROP TABLE "_signup_v" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section" CASCADE;
  DROP TABLE "_pages_v_blocks_people_grid_people" CASCADE;
  DROP TABLE "_pages_v_blocks_people_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_committee_list" CASCADE;
  DROP TABLE "_pages_v_blocks_resource_library" CASCADE;
  DROP TABLE "_pages_v_blocks_event_details_items" CASCADE;
  DROP TABLE "_pages_v_blocks_event_details" CASCADE;
  DROP TABLE "_pages_v_blocks_agenda_periods_entries" CASCADE;
  DROP TABLE "_pages_v_blocks_agenda_periods" CASCADE;
  DROP TABLE "_pages_v_blocks_agenda" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_panel_items" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_panel" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "committees_functions" CASCADE;
  DROP TABLE "committees_board_members" CASCADE;
  DROP TABLE "committees_board_responsibilities" CASCADE;
  DROP TABLE "committees" CASCADE;
  DROP TABLE "_committees_v_version_functions" CASCADE;
  DROP TABLE "_committees_v_version_board_members" CASCADE;
  DROP TABLE "_committees_v_version_board_responsibilities" CASCADE;
  DROP TABLE "_committees_v" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "document_categories" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "_header_v_version_nav_items_children" CASCADE;
  DROP TABLE "_header_v_version_nav_items" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "_footer_v_version_columns_links" CASCADE;
  DROP TABLE "_footer_v_version_columns" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "site_settings_emails" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_emails" CASCADE;
  DROP TABLE "_site_settings_v_version_social" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_page_hero_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_page_hero_title_size";
  DROP TYPE "public"."enum_pages_blocks_home_hero_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_split_content_background";
  DROP TYPE "public"."enum_pages_blocks_split_content_style";
  DROP TYPE "public"."enum_pages_blocks_content_background";
  DROP TYPE "public"."enum_pages_blocks_numbered_list_background";
  DROP TYPE "public"."enum_pages_blocks_numbered_list_layout";
  DROP TYPE "public"."enum_pages_blocks_numbered_grid_background";
  DROP TYPE "public"."enum_pages_blocks_checklist_background";
  DROP TYPE "public"."enum_pages_blocks_icon_list_items_icon";
  DROP TYPE "public"."enum_pages_blocks_icon_list_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_card_grid_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_style";
  DROP TYPE "public"."enum_pages_blocks_stats_variant";
  DROP TYPE "public"."enum_pages_blocks_media_block_background";
  DROP TYPE "public"."enum_pages_blocks_cta_band_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_cta_band_style";
  DROP TYPE "public"."enum_pages_blocks_cta_band_icon";
  DROP TYPE "public"."enum_pages_blocks_pricing_background";
  DROP TYPE "public"."enum_pages_blocks_pricing_callout_icon";
  DROP TYPE "public"."enum_signup_background";
  DROP TYPE "public"."enum_pages_blocks_people_grid_background";
  DROP TYPE "public"."enum_pages_blocks_people_grid_display";
  DROP TYPE "public"."enum_pages_blocks_event_details_items_icon";
  DROP TYPE "public"."enum_pages_blocks_event_details_background";
  DROP TYPE "public"."enum_pages_blocks_agenda_background";
  DROP TYPE "public"."enum_pages_blocks_benefits_panel_items_icon";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_page_hero_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_page_hero_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_background";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_style";
  DROP TYPE "public"."enum__pages_v_blocks_content_background";
  DROP TYPE "public"."enum__pages_v_blocks_numbered_list_background";
  DROP TYPE "public"."enum__pages_v_blocks_numbered_list_layout";
  DROP TYPE "public"."enum__pages_v_blocks_numbered_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_checklist_background";
  DROP TYPE "public"."enum__pages_v_blocks_icon_list_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_icon_list_background";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_style";
  DROP TYPE "public"."enum__pages_v_blocks_stats_variant";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_icon";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_background";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_callout_icon";
  DROP TYPE "public"."enum__signup_v_background";
  DROP TYPE "public"."enum__pages_v_blocks_people_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_people_grid_display";
  DROP TYPE "public"."enum__pages_v_blocks_event_details_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_event_details_background";
  DROP TYPE "public"."enum__pages_v_blocks_agenda_background";
  DROP TYPE "public"."enum__pages_v_blocks_benefits_panel_items_icon";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_site_settings_social_platform";
  DROP TYPE "public"."enum__site_settings_v_version_social_platform";`)
}
