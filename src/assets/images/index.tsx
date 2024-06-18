const imageBasePath = './assets/images'; // Assuming your images are in an 'assets/images' folder

type ImagePaths = Record<string, string>;

export const imagePaths: Record<string, ImagePaths> = {
  graphicCards: {
    rtx3050: getImageUrl('graphicCards', 'rtx3050.jpg'),
    rtx3060: getImageUrl('graphicCards', 'rtx3060.jpg'),
    rtx3070: getImageUrl('graphicCards', 'rtx3070.jpg'),
    rtx3080: getImageUrl('graphicCards', 'rtx3080.jpg'),
    rtx4060: getImageUrl('graphicCards', 'rtx4060.jpg'),
  },
  monitors: {
    monitor1: getImageUrl('Monitors', 'monitor_1.jpg'),
    monitor2: getImageUrl('Monitors', 'monitor_2.jpg'),
    monitor3: getImageUrl('Monitors', 'monitor_3.jpg'),
    monitor4: getImageUrl('Monitors', 'monitor_4.jpg'),
    monitor5: getImageUrl('Monitors', 'monitor_5.jpg'),
  },
  keyboards: {
    teclado1: getImageUrl('Keyboards', 'hunstman_mini.jpg'),
    teclado2: getImageUrl('Keyboards', 'hyperx_alloy.jpg'),
    teclado3: getImageUrl('Keyboards', 'razer_blackwidow.jpg'),
    teclado4: getImageUrl('Keyboards', 'teclado_logitech.jpg'),
    teclado5: getImageUrl('Keyboards', 'teclado_asus.jpg'),
  },
  motherboards: {
    motherboard1: getImageUrl('Motherboards', 'motherboard_1.jpg'),
    motherboard2: getImageUrl('Motherboards', 'motherboard_2.jpg'),
    motherboard3: getImageUrl('Motherboards', 'motherboard_3.jpg'),
    motherboard4: getImageUrl('Motherboards', 'motherboard_4.jpg'),
    motherboard5: getImageUrl('Motherboards', 'motherboard_5.jpg'),
  }
};

function getImageUrl(category: string, imageName: string): string {
  return `${imageBasePath}/${category}/${imageName}`;
}
