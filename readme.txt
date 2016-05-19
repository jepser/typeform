=== Plugin Name ===
Contributors: jepser
Tags: typeform, forms, surveys, quizzes, form builder, survey builder, quiz builder, custom forms, mobile forms, payment forms, order forms, feedback forms, enquiry forms, stripe, dropbox, google sheets, mailchimp, salesforce, hubspot, activecampaign, infusionsoft, asana, hipchat, slack, trello, zendesk
Requires at least: 4.0
Tested up to: 4.5.1
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Build beautiful, interactive, mobile-ready forms, surveys, and questionnaires without code.

== Description ==

Typeform is online forms reimagined. Use a simple drag-and-drop interface to create any kind of form, survey, or questionnaire, and even take credit card payments. What makes a typeform different from every other kind of form? Using one feels like an interactive conversation, so you’ll get better engagement and more responses—on every device. If you don’t believe us, ask Twitter.

> <strong> Important </strong><br>
> This plugin is for embedding forms created on typeform.com. (You can't edit them or see responses inside WordPress, sorry.) If you haven’t used Typeform before, you can try it out without signing up. Make sure you save your account!

------------

= Create powerful forms without code = 
* 16+ field types including text, number, multiple choice, picture choice, dropdown, email, rating, date, opinion scale, file upload (PRO), and payment (PRO)
* Insert images, videos, and animated GIFs
* Logic-based question jumping and branching (PRO)
* Multiple custom Thank You screens (PRO)

https://hello.typeform.com/to/jPC9kB

= Customize the design to match your style = 
* Choose button, text, and background colors
* 30+ web fonts from Google Fonts
* Image backgrounds

https://hello.typeform.com/to/ngPiTl

= See metrics at a glance and generate beautiful reports =
* Simple dashboard showing visits, responses, completion rate, and average completion time
* Stylish web report with PDF export
* Export responses to CSV and XLSX

https://hello.typeform.com/to/eyVuDQ

= Integrate with your favorite tools =
Use [Zapier](https://zapier.com/zapbook/typeform/) to send entries from your typeforms to Dropbox, Google Sheets, Mailchimp, Salesforce, Hubspot, ActiveCampaign, Infusionsoft, Asana, Hipchat, Slack, Trello, Zendesk, and more.

Find out more at [typeform.com](http://www.typeform.com/).
See what people are [saying on Twitter](https://twitter.com/typeform/timelines/574944095094841344).

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Add your typeforms thru the button that has been added to post/pages editor aside of the Media Button
4. Add your typeform's url and select from the options available

== Frequently Asked Questions ==

= How can I add a Typeform to my content? =

Just click the button beside the Media Upload button complete the form fields, just the URL is required.

= Which is the shortcode? =

`[typeform_embed url="your-url" height="in px or the unit you want" width="in px or the unit you want"]`

Notice the only parameter required is the url.

== Changelog ==

= 0.6 =
* Added support to pass variables to typeforms, feature available for PRO and PRO+ users (Thanks Matt Mike!)
* Added new `typeform_embed_url` filter so you can modify the url by filter
* Code improvements and minor tweaks

= 0.5.1 =
* Error importing Visual Composer dependency

= 0.5 =
* Minor improvements
* Fixed error in PHP < 5.4 in frontend
* Added basic support to Visual Composer - tested 4.2.2+

= 0.4 =
* Added new embed options (embed, drawer, classic) - More info at: https://www.typeform.com/help/embed-a-typeform/
* Added same new options to widget
* Added link option on classic (popup) and drawer
* Added link style option on classic (popup) and drawer

= 0.3.2 =
* Fix javascript issue with ACF and other plugin that uses custom post types without editor

= 0.3.1 =
* Changes in README

= 0.3 =
* Changes in UI
* Added templates that were missing

= 0.2 = 
* General UI redesign
* Change button position to be aside of Media Button
* Added a beautiful design on the editor
* Added option to edit values

= 0.1 =
Very first release, add your Typeforms to your content or in a widget.
