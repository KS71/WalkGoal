# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# --- Capacitor / Cordova bridge ---
# Capacitor plugins are invoked via reflection, so their classes, methods
# and annotations must survive obfuscation or the WebView bridge breaks.
-keep class com.getcapacitor.** { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin class * { *; }
-keep class * extends com.getcapacitor.Plugin { *; }
-keepclassmembers class * extends com.getcapacitor.Plugin {
    @com.getcapacitor.annotation.PluginMethod <methods>;
}
-keep class org.apache.cordova.** { *; }

# Health Connect plugin (capgo-capacitor-health) talks to Health Connect via
# reflection/records; keep its classes and the Health Connect client API.
-keep class com.capgo.capacitorhealth.** { *; }
-keep class androidx.health.connect.** { *; }

# WebView JavaScript interfaces must keep their public methods.
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep default no-args constructors for classes instantiated via reflection.
-keepclassmembers class * {
    public <init>();
}
