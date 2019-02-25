package com.yxl.view;

import org.apache.cordova.DroidGap;

import android.app.Activity;
import android.os.Bundle;

public class Prodemo2antvActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        super.loadUrl("file:///android_asset/www/html/login.html");
//        setContentView(R.layout.main);
    }
}