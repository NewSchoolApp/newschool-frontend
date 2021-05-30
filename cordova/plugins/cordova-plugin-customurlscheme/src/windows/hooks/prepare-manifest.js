module.exports = function(context) {
    var fs = require('fs'),
        et = require('elementtree'),
        path = require('path'),
        xml= context.requireCordovaModule('cordova-common').xmlHelpers,
        projectRoot = path.join(context.opts.projectRoot, "platforms", "windows");

    var MANIFEST_WINDOWS    = 'package.windows.appxmanifest',
        MANIFEST_PHONE      = 'package.phone.appxmanifest',
        MANIFEST_WINDOWS10  = 'package.windows10.appxmanifest',
        MANIFEST_WINDOWS80  = 'package.windows80.appxmanifest';

    function updateManifestFile(manifestPath) {
        if (!fs.existsSync(manifestPath)) {
            return;
        }

        var doc = xml.parseElementtreeSync(manifestPath);
        var root = doc.getroot();
        var app = root.find('./Applications/Application');
        if (!app) {
            throw new Error(manifestPath + ' has incorrect XML structure.');
        }
        if (!app.find('./Extensions')) {
            app.append(new et.Element('Extensions'));
        }
        fs.writeFileSync(manifestPath, doc.write({indent: 4}), 'utf-8');
    }

    [MANIFEST_PHONE, MANIFEST_WINDOWS80, MANIFEST_WINDOWS, MANIFEST_WINDOWS10]
    .forEach(function(manifestFile) {
        updateManifestFile(path.join(projectRoot, manifestFile));
    });
}
