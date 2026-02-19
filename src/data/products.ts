export const products = [
    //uniwersal primer
    {
        category: "universal_primer",
        productCode: "EWI-310",
        productName: "Universal Primer",
        image: "/media/universal_primer.png",
        unitDetail: "20kg bucket",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/universal-primer-ewi-310-20kg/",
        coverage: 60,
        unitInPack: 1       
    },

    // adhesive render only
    {
        category: "adhesive",
        productCode: "EWI-225",
        productName: "Premium 1Basecoat 25kg",
        image: "/media/adhesive.png",
        unitDetail: "25kg/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/premium-basecoat-ewi-225-25kg/",
        variants: [
            { usage: "render_only", coverage: 3.5 },
            { usage: "insulation_system", coverage: 2.5 }
        ],
        unitInPack: 1
    },
    {
        category: "adhesive",   
        productCode: "EWI-220",
        productName: "EPS Basecoat Adhesive 25kg",
        image: "/media/eps_adhesive.png",
        unitDetail: "25kg/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/eps-basecoat-adhesive-ewi-220-25kg/",
        coverage: 2.5,
        unitInPack: 1
    },

    {
        category: "mesh",
        productCode: "PXM-165706",
        productName: "Orange Fibreglass Mesh (165g/m²)",
        image: "/media/orange-fibreglass-mesh.png",
        unitDetail: "50 sqm/roll",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/orange-fibreglass-mesh-50m2/",
        coverage: 42.5,
        unitInPack: 1
    },
    {
        category: "mesh",
        productCode: "PXM-165702",
        productName: "Fibreglass Mesh (165g/m²)",
        image: "/media/fibreglass-mesh.png",
        unitDetail: "50 sqm/roll",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/fibreglass-mesh-150g-m2-50m2/",
        coverage: 42.5,
        unitInPack: 1
    },

    //insulation
    {
        category: "insulation",
        productCode: "SPI-EWIPLUS",
        productName: "EPS Insulation",
        image: "/media/eps.png",
        unitDetail: "sqm",
        link: "https://ewistore.co.uk/shop/ewi-410-eps-platinum-grey-insulation-50mm/",
        variants: [
            { thickness: 50, coverage: 0.72 },
            { thickness: 70, coverage: 0.72 },
            { thickness: 90, coverage: 0.72 },
            { thickness: 100, coverage: 0.72 },
            { thickness: 150, coverage: 5.72 }
        ],
        unitInPack: 1,
    },
    {
        category: "insulation",
        productCode: "KNG-K5",
        productName: "Kingspan K5",
        image: "/media/kingspan.png",
        unitDetail: "boards",
        link: "https://ewistore.co.uk/shop/kingspan-k5-external-wall-board/",
        coverage: 0.72,
        unitInPack: 1,
    },
    {
        category: "insulation",
        productCode: "ROC-470",
        productName: "Rockwool Dual Density Slab",
        image: "/media/mineralwool.png",
        unitDetail: "packs",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/rockwool-external-wall-dual-density-slab/",
        variants: [
            { thickness: 50, coverage: 2.88 },
            { thickness: 90, coverage: 2.16 },
            { thickness: 100, coverage: 0.72 },
            { thickness: 110, coverage: 12.96 },
            { thickness: 150, coverage: 11.52 }
        ],
        unitInPack: 1,
    },
    {
        category: "insulation",
        productCode: "STE-PROTECTLDRY",
        productName: "STEICO protect L dry - Wood Fibre Insulation Board",
        image: "/media/wood-fibre.png",
        unitDetail: "sqm",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/steico-protect-l-dry-wood-fibre-insulation-board/",
        coverage: 0.48,
        unitInPack: 1,
    },



    //beads & trims
    {
        category: "starter_track",
        productCode: "CMS-800-20",
        productName: "Premium Aluminium Starter Track",
        image: "/media/metalstartertrack.png",
        unitDetail: "2.5m/pc",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/premium-aluminium-starter-track-2-5m/",
        coverage: 2.5
    },
    {
        category: "clip_on",
        productCode: "LIK-136",
        productName: "Clip-on Profile for Starter Track",
        image: "/media/clip_on.png",
        unitDetail: "2.5m/pc",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/6mm-clip-on-profile/shop/external-wall-insulation/6mm-clip-on-profile-2-5m/-2-5m/",
        coverage: 2.5
    },
    {
        category: "starter_track",
        productCode: "VWS-4206",
        productName: "Adjustable uPVC Starter Track",
        image: "/media/plastic-start-bead.png",
        unitDetail: "2.0m/pc",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/adjustable-upvc-starter-track-2m/",
        coverage: 2
    },
    {
        category: "corner_beads",
        productCode: "LIK-115",
        productName: "uPVC Render Corner Bead",
        image: "/media/cornerbead.png",
        unitDetail: "2.5m/pc",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/pvc-corner-bead-with-mesh-2-5m/",
        coverage: 2.5
    },
    {
        category: "stop_beads",
        productCode: "LIK-121",
        productName: "uPVC Stop Bead with Mesh",
        image: "/media/stopbead.png",
        unitDetail: "2.5m/pc",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/upvc-stop-bead-with-mesh-2-5m/",
        coverage: 2.5
    },
    {
        category: "bellcast_beads",
        productCode: "LIK-566",
        productName: "Bellcast Bead - 10mm",
        image: "/media/bellcastbead.png",
        unitDetail: "2.5m/pc",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/white-bellcast-bead-14mm-single-bead/",
        coverage: 2.5
    },
    {
        category: "window_reveal",
        productCode: "LIK-160",
        productName: "Window Reveal Bead with Protective Lip & Mesh",
        image: "/media/windowreveal.png",
        unitDetail: "2.6m/pc",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/white-window-reveal-bead-with-mesh/",
        coverage: 2.6
    },


    // Fixings
    {
        category: "fixings",
        productCode: "WKR-FIXPLUG10",
        productName: "Hammer Fixing with Plastic Pin (200/box)",
        image: "/media/hammer_plastic_fixing.png",
        unitDetail: "200/box",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/10mm-hammer-fixing-with-plastic-pin-fixplug-10/",
        avaliable_lenght: [120, 140, 160, 180],
        unitInPack: 200,
        unitPerSqm: 7,
     },
     {
        category: "fixings",
        productCode: "ZIEL-ETX-M",
        productName: "EWI Pro - Metal Hammer Fixing (100/box)",
        image: "/media/metal_hammer_fixing.png",  
        unitDetail: "100/box",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/ewi-pro-metal-hammer-fixing-8mm/",
        avaliable_lenght: [75, 95, 115, 135, 155, 175, 195],
        unitInPack: 100,
        unitPerSqm: 7,
    },
    {
        category: "fixings",
        productCode: "ZIEL-ETX-MT",
        productName: "EWI Pro - Metal Screw Insulation Fixing (100/box)",
        image: "/media/screw_metal_fixing.png",  
        unitDetail: "100/box",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/ewi-pro-metal-screw-fixing-8mm/",
        avaliable_lenght: [95, 115, 135, 155, 175, 195, 215],
        unitInPack: 100,
        unitPerSqm: 7,
    },
    {
        category: "fixings",
        productCode: "RWL-R-TFIX-8S",
        productName: "RAWLPLUG - Metal Screw Fixing (200/box)",
        image: "/media/rawlplug_screw_metal_fixing.png",  
        unitDetail: "200/box",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/rawlplug-r-tfix-8s-metal-screw-fixing-135mm-box-of-200/",
        avaliable_lenght: [255],
        unitInPack: 200,
        unitPerSqm: 7,
    },



    // Brick slips
    {
        category: "brick_slips",
        productCode: "ELS-SAHARA-SLIP-1M2",
        productName: "Elabrick Brick Slips - Sahara",
        image: "/media/sahara.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-sahara/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips",
        productCode: "ELS-BLACKPOOL-SLIP-1M2",
        productName: "Elabrick Brick Slips - Blackpool",
        image: "/media/blackpool.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips---blackpool-corner-brick-slip/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips",
        productCode: "ELS-COLORADO-SLIP-1M2",
        productName: "Elabrick Brick Slips - Colorado",
        image: "/media/colorado.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-colorado/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips",
        productCode: "ELS-CORDOBA-SLIP-1M2",
        productName: "Elabrick Brick Slips - Cordoba",
        image: "/media/cordoba.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-cordoba/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips",
        productCode: "ELS-CORSICA-SLIP-1M2",
        productName: "Elabrick Brick Slips - Corsica",
        image: "/media/corsica.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-corsica/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips",
        productCode: "ELS-NEBRASKA-SLIP-1M2",
        productName: "Elabrick Brick Slips - Nebraska",
        image: "/media/nebraska.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-nebraska/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips",
        productCode: "ELS-MALTA-SLIP-1M2",
        productName: "Elabrick Brick Slips - Malta",
        image: "/media/malta.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-malta/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips",
        productCode: "ELS-ALASKA-SLIP-1M2",
        productName: "Elabrick Brick Slips - Alaska",
        image: "/media/alaska.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-alaska/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips",
        productCode: "ELS-GLASGOW-SLIP-1M2",
        productName: "Elabrick Brick Slips - Glasgow",
        image: "/media/glasgow.png",
        unitDetail: "1sqm/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-glasgow/",
        coverage: 1,
        unitInPack: 1
    },
    {
        category: "brick_slips_adhesive",
        productCode: "ELS-15KG-CEMENT-GREY",
        productName: "Elabrick Special Adhesive - Cement Grey",
        image: "/media/adhecive_brick_slips.png",
        unitDetail: "15kg/bucket",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-special-adhesive-15kg/",
        coverage: 6,
        unitInPack: 1
    },




    //Renders
    {
        category: "render",
        productCode: "EWI-040",
        productName: "Silicone Silicate Render",
        image: "/media/siliconesilicate.png",
        unitDetail: "25kg/bucket",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/silicone-silicate-render-ewi-040-25kg/",
        variants: [
            { grainSize: 1.5, coverage: 9 },
        ],
        unitInPack: 1,
    },
    {
        category: "render",
        productCode: "EWI-075",
        productName: "Silicone Render",
        image: "/media/silicone.png",
        unitDetail: "25kg/bucket",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/silicone-render-ewi-075-25kg-2-0mm/",
        variants: [
            { grainSize: 0.5, coverage: 18 },
            { grainSize: 1, coverage: 12 },
            { grainSize: 1.5, coverage: 9 },
            { grainSize: 2, coverage: 8 },
            { grainSize: 3, coverage: 6 }
        ],
        unitInPack: 1,
    },
    {
        category: "render",
        productCode: "EWI-076",
        productName: "Premium Bio Silicone Render",
        image: "/media/premiumbio.png",
        unitDetail: "25kg/bucket",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/silicone-render-premium-bio-ewi-076-25kg/",
        variants: [
            { grainSize: 1, coverage: 12 },
            { grainSize: 1.5, coverage: 9 },
        ],
        unitInPack: 1,
    },
    {
        category: "render",
        productCode: "EWI-077",
        productName: "Nano Drex Silicone Render",
        image: "/media/nanodrex.png",
        unitDetail: "25kg/bucket",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/silicone-render-nano-drex-ewi-077-25kg/",
        variants: [
            { grainSize: 1.5, coverage: 9 },
        ],
        unitInPack: 1,
    },




    {
        category: "primer_top_coat",
        productCode: "EWI-333-20",
        productName: "Top Coat Primer - 20kg",
        image: "/media/primer20.png",
        unitDetail: "20kg/bucket",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-20kg/",
        coverage: 60,
        unitInPack: 1
    },
    {
        category: "primer_top_coat",
        productCode: "EWI-333-7",
        productName: "Top Coat Primer - 7kg",
        image: "/media/primer7.png",
        unitDetail: "7kg/bucket",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-7kg/",
        coverage: 20,
        unitInPack: 1
    },

    // Additional products
    {
        category: "corner_brick_slips",
        productCode: "ELS-CORNER",
        productName: "Corner Brick Slip",
        image: "/media/brick_slip_corners.png",
        unitDetail: "2lm/box",
        coverage: 2,
        unitInPack: 1
    },
    {
        category: "levelling_coat",
        productCode: "EWI-260",
        productName: "Levelling Mortar",
        image: "/media/levelling_coat.png",
        unitDetail: "25kg/bag",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/levelling-mortar-for-walls-ewi-260-25kg/",
        unitInPack: 1
    },
    {
        category: "fungicidal_wash",
        productCode: "EVB-FUN5",
        productName: "Everbuild - 404 Fungicidal Wash",
        image: "/media/fungicidal.png",
        unitDetail: "5l/pcs",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/everbuild-404-fungicidal-wash/",
        unitInPack: 1
    },
    {
        category: "protection_film",
        productCode: "STP-PFW-11",
        productName: "ProGuard Window Protection Film",
        image: "/media/protection-film.png",
        unitDetail: "100m/roll",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/proguard-window-protection-film/",
        unitInPack: 1
    },
    {
        category: "tape",
        productCode: "EWS-TAPE-ORA",
        productName: "Orange Rendering Tape - 48mm x 50m",
        image: "/media/orange-tape.png",
        unitDetail: "50m/roll",
        link: "https://ewistore.co.uk/shop/external-wall-insulation/ewi-store-rendering-tape-orange-48mm-x-50m/",
        unitInPack: 1
    }
]