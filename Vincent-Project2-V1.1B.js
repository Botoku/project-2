// ==UserScript==
// @name         Vincent_Project2_V1.1B
// @namespace    https://findyourhealthyplace.com/
// @version      1.1
// @description  We will try to make the page easier to read and emphasize the most valuable information.
// @author       Team Croco: Vincent Botoku
// @match        https://findyourhealthyplace.com/product/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=findyourhealthyplace.com
// @grant        none
// ==/UserScript==
( croco => {
    /* Add GA config here: OD (Online Dialogue) or not */
    var isGALoad = 0;
	var toolConfig = {
	    gaid: 'UA-100962583-2',
	    variant: 'B',
	    category: 'AB-test',
	    label: 'Vincent-Project2'
	};

    /* End config */

    // Croco Config
    const config = {
        va: 'b', // Variant A, B C or etc...
        id: '000', // Ticket number
        s3: 'findyourhealthyplace' // xxx = for client domain name = to asset host folder name (s3)
    };

    croco(config, ( win, doc, q, qs, qsa, ce, applied, css, asset ) => {
        // Global Variables
        var $percentScroll
        var $isProductPage = /product/.test(window.location.href)

        /* Insert croco snippet here: */

        function style() {        
            css(` 
            .left-arrow{position: absolute; left:0; top: 50%; cursor: pointer;transform: translateY(-50%)}
            .right-arrow{position: absolute; right:0; top: 50%; transform: translateY(-50%) }
            .left-arrow p, .right-arrow p{font-size: 40px; font-weight: bold; cursor: pointer;}
            .moveRight{transform: translate3d(-550px, 0px, 0px) !important }
            .active{cursor: pointer;}
            .heading-container{font-size: 24px;}
            .description-container{font-size: 18px}
            .entry-title{margin-right: 38px;}
            `);

        }

        function getDocHeight() {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            )
        }
         
        function amountscrolled(){
            var $winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
            var $docheight = getDocHeight()
            var $scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
            var $trackLength = $docheight - $winheight
            $percentScroll = Math.floor($scrollTop/$trackLength * 100) 
            return $percentScroll

        }

        function gaLoad(d,h,k,e){var j=document,g=window,m=0,a=0,c,b;function i(){if(!m){m=1;if(typeof d==="undefined"){console.log("Code: L-GACONNF");return;}l();}}function f(){if(typeof analytics!=="undefined"){return analytics;}else{if(typeof _gaTracker!=="undefined"){return _gaTracker;}else{if(typeof ga!=="undefined"){return ga;}}}}function l(){var p=f(),o;if(typeof p!=="undefined"&&typeof p.getAll==="function"){c=p.getAll();if(c.length>1){for(var n=0;n<c.length;n++){o=c[n].get("trackingId");if(o==d.ODgaid||o==d.gaid){b=c[n].get("name");break;}}}else{if(c.length){o=c[0].get("trackingId");if(o==d.ODgaid||o==d.gaid){b=c[0].get("name");}}}if(b===undefined){console.log("Code: L-GACNF");return;}if(h==="standard"){if(d.ODid||d.variant){console.log("Use standard config...");return;}return k({gaSend:function(u,r,s,t){var w={nonInteraction:s};if(t){for(var q in t){w[q]=t[q];}}if(d.custom){for(var v in d.custom){w[v]=d.custom[v];}}p(b+".send","event",d.category,u!=""?u:d.action,r,w);}});}else{return k({gaSend:function(u,r,t){var w="pageview",y={nonInteraction:r},s=u.toLowerCase();if(t){for(var q in t){y[q]=t[q];}}if(d.custom){for(var v in d.custom){y[v]=d.custom[v];}}if(h==="standard"){}else{if(s!==w){u="Event - "+u;}if(d.ODgaid){if(s===w){u="Loaded - "+d.ODdev+" - "+d.ODpage+" - "+d.ODname;}p(b+".send","event",d.ODecat,d.ODid+" "+d.ODvar+": "+u,"",y);}else{if(d.variant){if(s===w){u="Loaded - "+u;}p(b+".send","event",d.category+": "+d.variant+" : "+d.label,u,y);}else{if(d.action){p(b+".send","event",d.category,d.action,u,y);}}}}}});}}else{if(a++>(e?e:50)){console.log("Code: L-GANF");}else{setTimeout(l,500);}}}if(j.readyState=="complete"){i();}else{if(j.addEventListener){j.addEventListener("DOMContentLoaded",i);g.addEventListener("load",i);}else{j.attachEvent("onreadystatechange",function(){if(j.readyState=="complete"){i();}});}}}

        function variant() {           
            // Todo:
            // Variant manipulation
            // check if is product page by checking url with regex
            if($isProductPage){
                // check if active class created by me is already created and active.
            if(!q('.active')[0]) {
            q('.woocommerce-product-gallery__image.flex-active-slide')[0].classList.add('active')
            }  
            var $leftArrowContainer = ce('div') 
            var $rightArrowContainer = ce('div')
            var $headingContainer = ce('div')
            var $descriptionContainer = ce('div')
            $leftArrowContainer.innerHTML = '<p><i class="fas fa-solid fa-chevron-left"></i></p>'
            $rightArrowContainer.innerHTML = '<p class=><i class="fas fa-solid fa-chevron-right"></i></p>'
            $leftArrowContainer.className= 'left-arrow'
            $rightArrowContainer.className= 'right-arrow'
            q('.flex-viewport')[0].append($leftArrowContainer)
            q('.flex-viewport')[0].append($rightArrowContainer)

            $headingContainer.className = 'heading-container'
            $descriptionContainer.className = 'description-container'
          
            $headingContainer.append(q('.product_title.entry-title')[0])

            var $textContainer = q('.text-area')[0]
            var $text = $textContainer.querySelector('p')
            $descriptionContainer.append($text)

            if(q('.flex-viewport')[1]){
                q('.flex-viewport')[1].insertAdjacentHTML('beforebegin',$headingContainer.innerHTML)

            q('.flex-viewport')[1].insertAdjacentHTML('beforebegin',$descriptionContainer.innerHTML)}
            
            if(!q('.flex-viewport')[1]){
                q('.flex-viewport')[0].insertAdjacentHTML('beforebegin',$headingContainer.innerHTML)

                 q('.flex-viewport')[0].insertAdjacentHTML('beforebegin',$descriptionContainer.innerHTML)
            }
            q('.product_title.entry-title')[1].style.display = 'none'
          
        }
        }

        function events() {
            //
            // Insert event method with tracking, like GA, Optimizely etc... 


                 gaLoad(toolConfig, 'custom', function(ua) {	
                // Set false or true to send "Pageview" GA on page load
                // isGALoad Prevent multiple load when events() called inside ajaxSuccess, ajaxStop or ajaxComplete
                if(true && !isGALoad) {
                    isGALoad = 1;                
                    }
                // Event with tracking HERE
               if($percentScroll === 25){us.gaSend('User scrolled 25% of the page'), 0}
            }, 75);          
        
            // Event without tracking HERE
           if($isProductPage){ q('.left-arrow')[0].addEventListener('click', ()=>{               
               var $activeSlide = q('.active')[0]
               if(!q('.active')[0].previousElementSibling) return
                var $prevSlideWidth = $activeSlide.previousElementSibling.style.width
                var $prevSlideWidthNumber = $prevSlideWidth.slice(0, $prevSlideWidth.indexOf('px'))
                var $transformstyle = q('figure.woocommerce-product-gallery__wrapper')[0].style.transform 
                var $currentXTransform = $transformstyle.slice(($transformstyle.indexOf('(')) + 1,$transformstyle.indexOf('px'))
                var $currentTransform =parseInt($prevSlideWidthNumber) + parseInt($currentXTransform)             
                q('figure.woocommerce-product-gallery__wrapper')[0].style.transform = `translateX(${$currentTransform}px)`
                q('.active')[0].previousElementSibling.classList.add('active')
                q('.active')[1].classList.remove('active')
            })}
           
           if($isProductPage){ q('.right-arrow')[0].addEventListener('click', (e)=>{
               var $activeSlide = q('.active')[0]
               if(!q('.active')[0].nextElementSibling) return

                var $nextSlideWidth = $activeSlide.nextElementSibling.style.width
                var $nextSlideWidthNumber = $nextSlideWidth.slice(0, $nextSlideWidth.indexOf('px'))
                var $transformstyle = q('figure.woocommerce-product-gallery__wrapper')[0].style.transform 
                var $currentXTransform = $transformstyle.slice(($transformstyle.indexOf('(')) + 1,$transformstyle.indexOf('px'))
        
                q('figure.woocommerce-product-gallery__wrapper')[0].style.transform = `translateX(${$currentXTransform - $nextSlideWidthNumber}px)`
                q('.active')[0].nextElementSibling.classList.add('active')
                q('.active')[0].classList.remove('active')
         
            })}
        }

        // Run immediately
        // Set TRUE for FORCE RUN e.g applied(true)
        if ( !applied() ) {
            style();
            variant();
            events();
        }

        // Else run in doc ready
        /*
        function ready(e){if("function"==typeof e)return"interactive"===doc.readyState||"complete"===doc.readyState?e():void doc.addEventListener("DOMContentLoaded",e,!1)}
        ready( () => {
            if ( !applied() ) {
                style();
                variant();
                events();
            }
        });
        */

    });

})( ( config, callback ) => {

    const win = window,
        doc = document,
        qs = document.querySelector.bind( document ),
        qsa = document.querySelectorAll.bind( document ),
        ce = document.createElement.bind( document );

    const id = `croco-${ config.id }-${config.va}`.toLowerCase(),
        base = `//ta-client-assets.s3.amazonaws.com/${ config.s3 }/${ config.id }`;

    const query = ( selector, context ) => {

        if ( !selector ) {

            return null;

        }

        if (context) {

            context = context[0] || context;
            return context.querySelectorAll( selector );

        } else {

            return qsa( selector );

        }
    };

    const css = ( style ) => {

        if ( qs(`#${ id }-style`) ) {

            return;

        }

        // Add variant style
        const $style = ce('style');

        $style.id = `${ id }-style`;
        $style.innerHTML = style;

        qs('head').append(
            $style
        );
        
    }
    
    const applied = ( forceRun ) => {

        const $html = qs('html');

        if ( win.location.search.indexOf('run=false') !== -1 ) {

            if ( !forceRun ) {

                return 1;

            }

        }
        // Check is variant applied
        if ( !$html.classList.contains( id ) ) {
            // Add variant test ID
            $html.classList.add( id );
            return 0;

        }

        return 1;

    }

    const asset = ( filename ) => {
        // Make s3 asset link
        return base + '/' + filename;
    }

    win.croco = query;

    callback(win, doc, query, qs, qsa, ce, applied, css, asset);

});