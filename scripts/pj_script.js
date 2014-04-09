$(document).ready(function() {
    (function($) {
        jQuery.fn.extend({
            pj_autoSlider: function(options) {
                var defaults = {
                    mainClass: '#autoSlider',
                    imageClass: '#autoSlider div img',
                    imageSize: 2000,
                    sliderClass: '#autoSlider div',
                    bulletsClass: '#autoSlider .bullets',
                    firstLeftMargin: 500,
                    intervalTime: 5000
                };
                var options = $.extend(true, {}, defaults, options);

                var countImage = $(options.imageClass).size();
                var sliderWidth = options.imageSize * countImage;
                var animateNumber = parseInt(options.imageSize) + 500;
                var activeLi = 1;
                var interval = Interval();
                var getValue;

                //Add Slider Width
                $(options.sliderClass).css('width', sliderWidth);

                //Create Bullet Points
                function CreatePoints() {
                    $(options.mainClass).append('<ul class="bullets"></ul>');
                    for (var i = 1; i <= countImage; i++) {
                        $(".bullets").append('<li value="' + i + '"></li>');
                        $(options.imageClass + ":nth-child(" + i + ")").attr('value', i);
                    }
                }
                CreatePoints();

                //Default Active
                $(options.bulletsClass + " li:nth-child(" + activeLi + ")").addClass('active');

                //Bullets Click Action
                function BulletsAction() {
                    $(options.bulletsClass + " li").click(function() {
                        clearInterval(interval);

                        getValue = parseInt(this.value);
                        activeLi = getValue - 1;
                        AutoRotate();

                        interval = Interval();
                    });
                }
                BulletsAction();

                //Slider Interval
                function Interval() {
                    intr = setInterval(function() {
                        AutoRotate();
                    }, options.intervalTime);
                    return intr;
                }

                //Rotate Functionality
                function AutoRotate() {
                    if (activeLi == countImage) {
                        activeLi = 0;
                        animateNumber = options.firstLeftMargin;
                    }

                    activeLi = activeLi + 1;
                    animateNumber = (activeLi * options.imageSize - options.imageSize) + 500;

                    $(options.sliderClass).animate({
                        'margin-left': -Math.abs(animateNumber)
                    });

                    $(options.bulletsClass + " li").removeAttr('class');
                    $(options.bulletsClass + " li:nth-child(" + activeLi + ")").addClass('active');
                }
            }
        });
    })(jQuery);
});