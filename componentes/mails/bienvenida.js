'use strict';

module.exports = {
    from: '"Seolidera Google Partner" <seolidera@gmail.com>',
    // to: 'adolfo@onrubia.es',
    subject: 'ღ Bienvenid@ a tu nuevo Partner de Google ❤ Seolidera™ ✉',
    text: 'Bienvenido a tu Partner de Google Seolidera.',
    html: { path: '/home/crm/web/crm.seolidera.com/express/public/docs/bienvenida-seolidera.html'},
    // html: '<b style="font-size: 2em; font-weight: 100; text-align: center;">Bienvenido a tu Partner de Google Seolidera.</b><br>Logo: <img src="cid:logo-seolidera" alt="logo"/>',
    attachments: [
        // {
        //     filename: 'logo-seolidera-firmas.jpg',
        //     path: '/home/crm/web/crm.seolidera.com/express/public/images/logo-seolidera-firmas.jpg',
        //     cid: 'logo-seolidera'
        // },
        {
            filename: 'presentacion-seolidera.pdf',
            path: '/home/crm/web/crm.seolidera.com/express/public/docs/presentacion-seolidera.pdf',
            cid: 'presentacion-seolidera'
        }
    ]
};