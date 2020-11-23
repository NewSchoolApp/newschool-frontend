package com.santinowu.cordova.imagedownloader;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import java.net.URL;
import java.net.URLEncoder;
import java.net.HttpURLConnection;
import java.io.File;
import java.io.InputStream;
import java.io.FileOutputStream;
import java.lang.Exception;

import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.os.Build.VERSION;
import android.webkit.URLUtil;
import android.content.Intent;
import android.net.Uri;

public class ImageDownloader extends CordovaPlugin {
    public final static String Log_TAG = "com.santinowu.cordova.imagedownloader";
    public final static String ACTION_DOWNLOAD = "download";
    public final static String SUCCESS_MESSAGE = "success";
    public final static String FAILURE_MESSAGE = "failure";

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String url = args.getString(0);

        if (action.equals(ACTION_DOWNLOAD)) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    File image = download(url);

                    if (image != null) {
                        callbackContext.success(SUCCESS_MESSAGE);

                        scanImage(image);

                        return;
                    }

                    callbackContext.error(FAILURE_MESSAGE);
                }
            });

            return true;
        }

        return false;
    }

    private File download(String urlStr) {
        URL url = getURL(urlStr);

        if (null == url) {
            Log.d(Log_TAG, "Fail to get URL");

            return null;
        }

        Log.d(Log_TAG, String.format("Downloading image from URL: %s", url.toString()));

        Bitmap bitmap = downloadImage(url);

        if (null == bitmap) {
            Log.d(Log_TAG, "Failed to download image");

            return null;
        }

        File image = saveImage(bitmap, url);

        if (null == image) {
            Log.d(Log_TAG, "Failed to save image");

            return null;
        }

        return image;
    }

    private URL getURL(String urlStr) {
        URL url = null;

        try {
            url = new URL(urlStr);
        } catch (Exception e) {
            Log.d(Log_TAG, e.getMessage());

            return null;
        }

        return url;
    }

    private boolean isExternalStorageWritable(File path) {
        if (android.os.Build.VERSION.SDK_INT < 21) {
            return Environment
                .MEDIA_MOUNTED
                .equals(Environment.getStorageState(path)) &&
                path.canWrite();
        }
        return Environment
            .MEDIA_MOUNTED
            .equals(Environment.getExternalStorageState(path)) &&
            path.canWrite();
    }

    private File getImageFile(String fileName) {
        File exPicPath = Environment
                .getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        File exPath = Environment.getExternalStorageDirectory();

        if (isExternalStorageWritable(exPicPath)) {
            return new File(exPicPath, fileName);
        }

        if (isExternalStorageWritable(exPath)) {
            return new File(exPath, fileName);
        }

        return new File(Environment.getDataDirectory(), fileName);
    }

    private File saveImage(Bitmap bitmap, URL url) {
        File imageFile = null;
        String fileName = getFileName(url);

        try {
            imageFile = getImageFile(fileName);

            FileOutputStream fos = new FileOutputStream(imageFile);

            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);

            fos.flush();
            fos.close();
        } catch (Exception e) {
            imageFile = null;
        }

        return imageFile;
    }

    private String getFileName(URL url) {
        return URLUtil.guessFileName(url.toString(), null, null);
    }

    private Bitmap downloadImage(URL url) {
        HttpURLConnection conn = null;
        Bitmap bitmap = null;

        try {
            conn = (HttpURLConnection) url.openConnection();
            conn.connect();

            if (HttpURLConnection.HTTP_OK == conn.getResponseCode()) {
                InputStream stream = conn.getInputStream();

                if (null != stream) {
                    bitmap = BitmapFactory.decodeStream(stream);
                }

                stream.close();
            }
        } catch (Exception e) {
            Log.d(Log_TAG, e.getMessage());

            bitmap = null;
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }

        return bitmap;
    }

    private void scanImage(File image) {
        Log.d(Log_TAG, "Scanning downloaded Image");

        Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        Uri contentUri = Uri.fromFile(image);

        mediaScanIntent.setData(contentUri);

        cordova.getActivity().sendBroadcast(mediaScanIntent);
    }
}
