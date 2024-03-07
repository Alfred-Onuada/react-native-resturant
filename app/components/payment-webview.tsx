import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';

export default function PaymentWebView({url, handleNavigationChange}: {url: string, handleNavigationChange: (e: WebViewNavigation) => void}) {
  return (
    <WebView
      onNavigationStateChange={handleNavigationChange}
      style={styles.container}
      source={{ uri: url }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
}); 