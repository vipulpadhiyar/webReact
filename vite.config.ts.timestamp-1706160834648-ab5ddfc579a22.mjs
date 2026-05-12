// vite.config.ts
import react from "file:///home/agilelpt75/Documents/live-project/numberDekho/react-number-dekho/reactjs-admin-number-dekho/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///home/agilelpt75/Documents/live-project/numberDekho/react-number-dekho/reactjs-admin-number-dekho/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///home/agilelpt75/Documents/live-project/numberDekho/react-number-dekho/reactjs-admin-number-dekho/node_modules/vite-plugin-pwa/dist/index.js";
import tsconfigPaths from "file:///home/agilelpt75/Documents/live-project/numberDekho/react-number-dekho/reactjs-admin-number-dekho/node_modules/vite-tsconfig-paths/dist/index.mjs";
var __vite_injected_original_dirname = "/home/agilelpt75/Documents/live-project/numberDekho/react-number-dekho/reactjs-admin-number-dekho";
var vite_config_default = defineConfig({
  build: {
    outDir: "build"
  },
  plugins: [
    react(),
    tsconfigPaths(),
    // TODO : Change below manifest file according to your project add appropriate icons in public folder
    VitePWA({
      registerType: "prompt",
      includeAssets: ["asset/favicon.ico"],
      manifest: {
        theme_color: "#f88935",
        background_color: "#f69435",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Agile React Boiler Plate",
        short_name: "Agile React App",
        description: "Description regarding your application"
        // icons: [
        //   {
        //     src: 'asset/icon-192x192.png',
        //     sizes: '192x192',
        //     type: 'image/png'
        //   },
        //   {
        //     src: 'asset/icon-256x256.png',
        //     sizes: '256x256',
        //     type: 'image/png'
        //   },
        //   {
        //     src: 'asset/icon-384x384.png',
        //     sizes: '384x384',
        //     type: 'image/png'
        //   },
        //   {
        //     src: 'asset/icon-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png'
        //   }
        // ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTests.ts"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hZ2lsZWxwdDc1L0RvY3VtZW50cy9saXZlLXByb2plY3QvbnVtYmVyRGVraG8vcmVhY3QtbnVtYmVyLWRla2hvL3JlYWN0anMtYWRtaW4tbnVtYmVyLWRla2hvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9hZ2lsZWxwdDc1L0RvY3VtZW50cy9saXZlLXByb2plY3QvbnVtYmVyRGVraG8vcmVhY3QtbnVtYmVyLWRla2hvL3JlYWN0anMtYWRtaW4tbnVtYmVyLWRla2hvL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2FnaWxlbHB0NzUvRG9jdW1lbnRzL2xpdmUtcHJvamVjdC9udW1iZXJEZWtoby9yZWFjdC1udW1iZXItZGVraG8vcmVhY3Rqcy1hZG1pbi1udW1iZXItZGVraG8vdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGUvY2xpZW50XCIgLz5cbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIG91dERpcjogJ2J1aWxkJ1xuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgLy8gVE9ETyA6IENoYW5nZSBiZWxvdyBtYW5pZmVzdCBmaWxlIGFjY29yZGluZyB0byB5b3VyIHByb2plY3QgYWRkIGFwcHJvcHJpYXRlIGljb25zIGluIHB1YmxpYyBmb2xkZXJcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ3Byb21wdCcsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Fzc2V0L2Zhdmljb24uaWNvJ10sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICB0aGVtZV9jb2xvcjogJyNmODg5MzUnLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnI2Y2OTQzNScsXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcbiAgICAgICAgc2NvcGU6ICcvJyxcbiAgICAgICAgc3RhcnRfdXJsOiAnLycsXG4gICAgICAgIG5hbWU6ICdBZ2lsZSBSZWFjdCBCb2lsZXIgUGxhdGUnLFxuICAgICAgICBzaG9ydF9uYW1lOiAnQWdpbGUgUmVhY3QgQXBwJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbiByZWdhcmRpbmcgeW91ciBhcHBsaWNhdGlvbidcbiAgICAgICAgLy8gaWNvbnM6IFtcbiAgICAgICAgLy8gICB7XG4gICAgICAgIC8vICAgICBzcmM6ICdhc3NldC9pY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgLy8gICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgIC8vICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAvLyAgIH0sXG4gICAgICAgIC8vICAge1xuICAgICAgICAvLyAgICAgc3JjOiAnYXNzZXQvaWNvbi0yNTZ4MjU2LnBuZycsXG4gICAgICAgIC8vICAgICBzaXplczogJzI1NngyNTYnLFxuICAgICAgICAvLyAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgLy8gICB9LFxuICAgICAgICAvLyAgIHtcbiAgICAgICAgLy8gICAgIHNyYzogJ2Fzc2V0L2ljb24tMzg0eDM4NC5wbmcnLFxuICAgICAgICAvLyAgICAgc2l6ZXM6ICczODR4Mzg0JyxcbiAgICAgICAgLy8gICAgIHR5cGU6ICdpbWFnZS9wbmcnXG4gICAgICAgIC8vICAgfSxcbiAgICAgICAgLy8gICB7XG4gICAgICAgIC8vICAgICBzcmM6ICdhc3NldC9pY29uLTUxMng1MTIucG5nJyxcbiAgICAgICAgLy8gICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgIC8vICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gXVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpXG4gICAgfVxuICB9LFxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICBzZXR1cEZpbGVzOiBbJ3NyYy9zZXR1cFRlc3RzLnRzJ11cbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxtQkFBbUI7QUFOMUIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQTtBQUFBLElBRWQsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsZUFBZSxDQUFDLG1CQUFtQjtBQUFBLE1BQ25DLFVBQVU7QUFBQSxRQUNSLGFBQWE7QUFBQSxRQUNiLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxRQUNULE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BdUJmO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVksQ0FBQyxtQkFBbUI7QUFBQSxFQUNsQztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
