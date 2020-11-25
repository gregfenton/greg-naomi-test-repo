function makeGraph(you, max, mean, std_dev, boundaries, cssIdentifier) {
  cssIdentifier = cssIdentifier || '';

  console.assert(you >= 0, { message: 'you score cannot be negative' });
  console.assert(max >= 0, { message: 'max score cannot be negative' });
  console.assert(you <= max, { message: 'you score cannot be more than max' });
  console.assert(mean >= 0, { message: 'mean score cannot be negative' });
  console.assert(std_dev >= 0, { message: 'std_dev score cannot be negative' });
  console.assert(boundaries.length >= 4, {
    message: 'Boundaries needs at least 4 values',
  });

  var boundaries_tcdf = tcdf(boundaries, 0, max, mean, std_dev);
  var you_tcdf = tcdf([you], 0, max, mean, std_dev);
  var you_pos = you_tcdf[0] * 100.0;

  $('#score' + cssIdentifier).html(lang.result_score_prefix + you);
  $('#you-pos' + cssIdentifier).css('left', you_pos + '%');

  createResultMessage(you_pos, cssIdentifier);
  createGradient(boundaries_tcdf, cssIdentifier);

  $('html, body').scrollTop($('#surveyElement').offset().top);
}

function createGradient(boundaries, cssIdentifier) {
  cssIdentifier = cssIdentifier || '';

  var blue_color = 'rgb(109,171,241)';
  var green_color = 'rgb(126,178,77)';
  var yellow_color = 'rgb(255,239,54)';
  var orange_color = 'rgb(233,139,58)';
  var red_color = 'rgb(214,38,49)';
  var gradient_string = green_color;

  if (boundaries.length === 4) {
    var green_right = boundaries[0] * 100.0;
    var yellow_right = boundaries[1] * 100.0;
    var orange_right = boundaries[2] * 100.0;
    var red_right = boundaries[3] * 100.0;

    var green_area = green_right - 0;
    var yellow_area = yellow_right - green_area;
    var orange_area = orange_right - (green_area + yellow_area);

    var factor = 0.1;
    var gradient_string =
      green_color +
      ' 0%, ' +
      green_color +
      ' ' +
      (green_right - green_area * factor) +
      '%, ' +
      yellow_color +
      ' ' +
      green_right +
      '%, ' +
      yellow_color +
      ' ' +
      (green_right + green_area * factor) +
      '%, ' +
      yellow_color +
      ' ' +
      (yellow_right - yellow_area * factor) +
      '%, ' +
      orange_color +
      ' ' +
      yellow_right +
      '%, ' +
      orange_color +
      ' ' +
      (yellow_right + yellow_area * factor) +
      '%, ' +
      orange_color +
      ' ' +
      (orange_right - orange_area * factor) +
      '%, ' +
      red_color +
      ' ' +
      orange_right +
      '%, ' +
      red_color +
      ' ' +
      (orange_right + orange_area * factor) +
      '%, ' +
      red_color +
      ' ' +
      red_right +
      '%)';
  } else if (boundaries.length === 5) {
    var blue_right = boundaries[0] * 100.0;
    var green_right = boundaries[1] * 100.0;
    var yellow_right = boundaries[2] * 100.0;
    var orange_right = boundaries[3] * 100.0;
    var red_right = boundaries[4] * 100.0;

    var blue_area = blue_right - 0;
    var green_area = green_right - blue_area;
    var yellow_area = yellow_right - (blue_area + green_area);
    var orange_area = orange_right - (blue_area + green_area + yellow_area);

    var factor = 0.1;
    var gradient_string =
      blue_color +
      ' 0%, ' +
      blue_color +
      ' ' +
      (blue_right - blue_area * factor) +
      '%, ' +
      green_color +
      ' ' +
      blue_right +
      '%, ' +
      green_color +
      ' ' +
      (blue_right + blue_area * factor) +
      '%, ' +
      green_color +
      ' ' +
      (green_right - green_area * factor) +
      '%, ' +
      yellow_color +
      ' ' +
      green_right +
      '%, ' +
      yellow_color +
      ' ' +
      (green_right + green_area * factor) +
      '%, ' +
      yellow_color +
      ' ' +
      (yellow_right - yellow_area * factor) +
      '%, ' +
      orange_color +
      ' ' +
      yellow_right +
      '%, ' +
      orange_color +
      ' ' +
      (yellow_right + yellow_area * factor) +
      '%, ' +
      orange_color +
      ' ' +
      (orange_right - orange_area * factor) +
      '%, ' +
      red_color +
      ' ' +
      orange_right +
      '%, ' +
      red_color +
      ' ' +
      (orange_right + orange_area * factor) +
      '%, ' +
      red_color +
      ' ' +
      red_right +
      '%)';
  }

  $('#sub-chart' + cssIdentifier).css(
    'background',
    '-moz-linear-gradient(left,' + gradient_string
  );
  $('#sub-chart' + cssIdentifier).css(
    'background',
    '-webkit-linear-gradient(left,' + gradient_string
  );
  $('#sub-chart' + cssIdentifier).css(
    'background',
    'linear-gradient(to right,' + gradient_string
  );
  $('#sub-chart' + cssIdentifier).css(
    'filter',
    "progid:DXImageTransform.Microsoft.gradient( startColorstr='#7EB24D', endColorstr='#D62631',GradientType=1 )"
  );
}

function createResultMessage(you, cssIdentifier) {
  cssIdentifier = cssIdentifier || '';

  console.assert(you >= 0, { message: 'score should be higher than 0' });
  console.assert(you <= 100, { message: 'score should be lower than 100' });
  var result_message;

  if (you < 2.28) {
    result_message = lang.norm_results_score.much_lower;
  } else if (you < 15.87) {
    result_message = lang.norm_results_score.lower;
  } else if (you < 30.86) {
    result_message = lang.norm_results_score.slightly_lower;
  } else if (you < 69.15) {
    result_message = lang.norm_results_score.comparable;
  } else if (you < 84.14) {
    result_message = lang.norm_results_score.slightly_higher;
  } else if (you < 97.73) {
    result_message = lang.norm_results_score.higher;
  } else {
    result_message = lang.norm_results_score.much_higher;
  }

  $('#compare_sample' + cssIdentifier).append(result_message);
}

function makeDivsForTooltips(
  green_width,
  yellow_width,
  orange_width,
  red_width,
  cssIdentifier
) {
  $('#green' + cssIdentifier).css('width', green_width + '%');
  $('#yellow' + cssIdentifier).css('width', yellow_width + '%');
  $('#orange' + cssIdentifier).css('width', orange_width + '%');
  $('#red' + cssIdentifier).css('width', red_width + '%');
}

function createTooltip() {
  var targets = $('[rel^=tooltip]'),
    target = false,
    tooltip = false,
    title = false;

  targets.bind('mouseenter', function () {
    target = $(this);
    var tip = target.attr('title');
    tooltip = $('<div id="tooltipcustom"></div>');

    if (!tip || tip == '') return false;

    target.removeAttr('title');
    tooltip.css('opacity', 1).html(tip).appendTo('body');

    var init_tooltip = function () {
      if ($(window).width() < tooltip.outerWidth() * 1.5)
        tooltip.css('max-width', $(window).width() / 2);
      else tooltip.css('max-width', 340);

      var pos_left =
          target.offset().left +
          target.outerWidth() / 2 -
          tooltip.outerWidth() / 2,
        pos_top = target.offset().top - tooltip.outerHeight() - 20;

      if (pos_left < 0) {
        pos_left = target.offset().left + target.outerWidth() / 2 - 20;
        tooltip.addClass('left');
      } else tooltip.removeClass('left');

      if (pos_left + tooltip.outerWidth() > $(window).width()) {
        pos_left =
          target.offset().left -
          tooltip.outerWidth() +
          target.outerWidth() / 2 +
          20;
        tooltip.addClass('right');
      } else tooltip.removeClass('right');

      if (pos_top < 0) {
        pos_top = target.offset().top + target.outerHeight();
        tooltip.addClass('top');
      } else tooltip.removeClass('top');

      tooltip.css({ left: pos_left, top: pos_top });
    };

    init_tooltip();
    $(window).resize(init_tooltip);

    var remove_tooltip = function () {
      $('#tooltipcustom').remove();

      target.attr('title', tip);
    };

    target.bind('mouseleave', remove_tooltip);
    tooltip.bind('click', remove_tooltip);
  });
}
