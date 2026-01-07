import type { Theme } from '../types/themes';

export const themes: Record<string, Theme> = {
  woozio: {
    name: "Woozio - Modern WooCommerce Theme",
    description: "A premium WordPress theme designed for modern e-commerce stores. Woozio combines beautiful design with powerful WooCommerce functionality, perfect for fashion, electronics, and lifestyle businesses.",
    packages: [
      {
        ID: "064e94a5-a9ea-4d49-950e-993a19e48bf5",
        name: "Dummy Package Woozio Mini",
        description: "Woozio is a modern and flexible multipurpose WooCommerce WordPress theme built with Elementor, designed to help you create professional online stores across a wide range of industries.",
        image: "https://market-resized.envatousercontent.com/themeforest.net/files/663541104/woozio-preview.__large_preview.jpg?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=16df3896a0c57d230542d9a9c443cfd987ca6a8732b187c18b9deb0c9ed9d7ea",
        preview_url: 'https://woozio.kinsta.cloud/',
        tags: ['woocommerce', 'mini'],
        size: '207.4MB',
        createdAt: new Date('2024-02-10T09:15:00Z'),
        updatedAt: new Date('2024-03-18T16:45:00Z'),
        required: [
          {
            type: "theme_version",
            value: '1.0.0'
          },
          {
            type: "php_version",
            value: "8.0"
          }
        ],
        required_plugins: [
          {
            "slug": "gravityforms\/gravityforms.php",
            "name": "Gravity Forms",
            "version": "2.9.24"
          },
          {
            "slug": "advanced-custom-fields-pro\/acf.php",
            "name": "Advanced Custom Fields PRO",
            "version": "6.7.0.2"
          },
          {
            "slug": "elementor-pro\/elementor-pro.php",
            "name": "Elementor Pro",
            "version": "3.34.0"
          },
          {
            "slug": "elementor\/elementor.php",
            "name": "Elementor",
            "version": "3.34.0"
          },
          {
            "slug": "nextend-smart-slider3-pro\/nextend-smart-slider3-pro.php",
            "name": "Smart Slider 3 Pro",
            "version": "3.5.1.29"
          },
          {
            "slug": "woocommerce\/woocommerce.php",
            "name": "WooCommerce",
            "version": "10.4.3"
          },
          {
            "slug": "worry-proof-backup\/worry-proof-backup.php",
            "name": "Worry Proof Backup",
            "version": "0.2.2"
          },
        ],
        r2_file: 'woozio/Dummy-Pack-Woozio-Mini.zip',
      },
      {
        ID: "064e94a5-a9ea-4d49-950e-993a19e48bf5",
        name: "Woozio Placeholder",
        description: "Woozio is a modern and flexible multipurpose WooCommerce WordPress theme built with Elementor, designed to help you create professional online stores across a wide range of industries.",
        image: "https://market-resized.envatousercontent.com/themeforest.net/files/663541104/woozio-preview.__large_preview.jpg?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=16df3896a0c57d230542d9a9c443cfd987ca6a8732b187c18b9deb0c9ed9d7ea",
        preview_url: 'https://woozio.kinsta.cloud/',
        tags: ['woocommerce', 'placeholder'],
        size: '207.4MB',
        createdAt: new Date('2024-02-10T09:15:00Z'),
        updatedAt: new Date('2024-03-18T16:45:00Z'),
        required: [
          {
            type: "theme_version",
            value: '1.0.0'
          },
          {
            type: "php_version",
            value: "8.0"
          }
        ],
        required_plugins: [
          {
            "slug": "gravityforms\/gravityforms.php",
            "name": "Gravity Forms",
            "version": "2.9.24"
          },
          {
            "slug": "advanced-custom-fields-pro\/acf.php",
            "name": "Advanced Custom Fields PRO",
            "version": "6.7.0.2"
          },
          {
            "slug": "elementor-pro\/elementor-pro.php",
            "name": "Elementor Pro",
            "version": "3.34.0"
          },
          {
            "slug": "elementor\/elementor.php",
            "name": "Elementor",
            "version": "3.34.0"
          },
          {
            "slug": "nextend-smart-slider3-pro\/nextend-smart-slider3-pro.php",
            "name": "Smart Slider 3 Pro",
            "version": "3.5.1.29"
          },
          {
            "slug": "woocommerce\/woocommerce.php",
            "name": "WooCommerce",
            "version": "10.4.3"
          },
          {
            "slug": "worry-proof-backup\/worry-proof-backup.php",
            "name": "Worry Proof Backup",
            "version": "0.2.2"
          },
        ],
        r2_file: 'woozio/Woozio-Placeholder.zip',
      },
    ]
  },
}