const template = require('lodash.template');

const toQueryString = (opts) => {
  const reducer = (a, k) => {
    const part = `${k}=${encodeURIComponent(opts[k])}`;

    a.push(part);
    return a;
  };

  return Object.keys(opts).reduce(reducer, []).join('&');
};

const fetch = (url, params, onSuccess) => {
  url = `${url}?${toQueryString(params)}`;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.responseType = 'json';

  xhr.onload = () => {
    onSuccess(xhr);
  };

  xhr.send();
};

const defaultTemplate = `
  <div class='bitsalad-img'>
    <% if(options.links) { %>
      <a href="<%= link %>" target='_blank'>
        <img src="<%= url %>"  width="<%= width %>" height="<%= height %>" />
      </a>
    <% } else { %>
        <img src="<%= url %>"  width="<%= width %>" height="<%= height %>" />
    <% } %>
  </div>
`;

const handleResponse = (data, opts) => {
  const div = document.getElementById(opts.id);

  if (!div) return;

  const html = data.map((image) => {
    let data = image.images[opts.resolution];

    image = Object.assign(image, {
      url: data.url,
      height: data.height,
      width: data.width,
      options: {
        links: opts.links,
        likes: opts.likes,
        comments: opts.comments,
        captions: opts.captions,
        tags: opts.tags
      }
    });

    return opts.cachedTemplate(image);
  });

  div.insertAdjacentHTML('beforeend', html.join(''));
};

const defaultOptions = {
  resolution: 'thumbnail',
  links: false,
  sortBy: 'created_time',
  template: defaultTemplate,
  filterByTags: []
};

const SaladSpinner = (opts, host) => {
  host = host || 'https://api2.bitsalad.co';

  opts = Object.assign({}, defaultOptions, opts);
  opts.cachedTemplate = template(opts.template);

  const params = {
    ids: opts.users,
    sortBy: opts.sortBy,
    limit: opts.limit
  };

  if (opts.filterByTags.length) params.filterByTags = opts.filterByTags;

  return {
    show() {
      let url = `${host}/feeds/${opts.userId}`;
      const handleSuccess = (xhr) => {
        handleResponse(xhr.response, opts);
      };

      fetch(url, params, handleSuccess);
    }
  };
};

export default SaladSpinner;
