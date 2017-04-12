## SaladSpinner


SaladSpinner makes it easy to add Instagram feeds to your website. SaladSpinner requires that your feeds be authenticated with BitSalad.co, first.

## Installation
Download the script and include it in your HTML:

```html
<script type="text/javascript" src="path/to/salad-spinner.min.js"></script>
```

## Basic Usage

Fetch and show your feed:

```html
<script type="text/javascript">
  SaladSpinner({
    userId: 'your_bitsalad_user_id',
    users: [authenticated_user_id, another_authenticated_user_id],
    sortBy: 'created_time',
    links: false,
    resolution: 'low_resolution',
    id: 'dom-element-id'
  }).show();
</script>
```

## Requirements

All you need is a __userId__ from BitSalad.co and at least one Instagram __user_id__. Head over to [BitSalad](http://www.bitsalad.co)., signin with your Instagram account and create your first feed.


## Options
- `userId` - __Required__. Your user id from BitSalad.co.
- `id` - The ID of the DOM element where you want to add the images to.
- `template` - Custom HTML template to use for images. See [templating](#templating).
- `filterByTags` (array of strings) - Retun only media with certain tags.
- `sortBy` (string) - Sort your media. Available options are:
    - `created_time` - Newest to oldest.
    - `likes.count` - Highest # of likes to lowest.
    - `comments.count` - Highest # of comments to lowest.
- `links` - Wrap media with a link to its source on Instagram.
- `limit` - Maximum number of items to return.
- `resolution` - Size of the images to get. Available options are:
    - `thumbnail` (default) - 150x150
    - `low_resolution` - 306x306
    - `standard_resolution` - 612x612


## Templating

The __template__ option allows you to control the markup for each feed item.

Basic example:

```html
<script type="text/javascript">
  SaladSpinner({
    userId: 'your_bitsalad_user_id',
    users: [authenticated_user_id, another_authenticated_user_id],
    id: 'dom-element-id',
    template: "<div class='image'><img src='<%= url %>' width='<%= width %>' height='<%= height %>' /><%= likes.count %></div>"
  }).show();
</script>
```

Notice the `{{link}}` and `{{image}}`? The templating option provides several tags for you to use to control where variables are inserted into your HTML markup. Available keywors are:


- `{{type}}` - the image's type. Can be `image` or `video`.
- `{{width}}` - contains the image's width, in pixels.
- `{{height}}` - contains the image's height, in pixels.
- `{{orientation}}` - contains the image's orientation. Can be `square`, `portrait`, or `landscape`.
- `{{link}}` - URL to view the image on Instagram's website.
- `{{image}}` - URL of the image source. The size is inherited from the `resolution` option.
- `{{id}}` - Unique ID of the image. Useful if you want to use [iPhone hooks](http://instagram.com/developer/iphone-hooks/) to open the images directly in the Instagram app.
- `{{caption}}` - Image's caption text. Defaults to empty string if there isn't one.
- `{{likes}}` - Number of likes the image has.
- `{{comments}}` - Number of comments the image has.
- `{{location}}` - Name of the location associated with the image. Defaults to empty string if there isn't one.
- `{{model}}` - Full JSON object of the image. If you want to get a property of the image that isn't listed above you access it using dot-notation. (ex: `{{model.filter}}` would get the filter used.)
