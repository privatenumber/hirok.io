<script setup lang="ts">
const inputFile = $ref('input.mov');
</script>

# Converting `.mov` to `.webm` on macOS

<!-- 
<input type="text" v-model="inputFile">

Codeblocks can't handle handebars
-->

Using [ffmpeg](https://formulae.brew.sh/formula/ffmpeg), you can convert a QuickTime video to WebM format:
```
ffmpeg -i input.mov -c:v libvpx -quality good -cpu-used 0 -b:v 7000k -qmin 10 -qmax 42 -maxrate 500k -bufsize 1500k -threads 8 -vf scale=-1:1080 -c:a libvorbis -b:a 192k -f webm output.webm
```

Add the `-an` flag to mute the audio.


## Context
I use the macOS screen recorder frequently (<kbd>Shift</kbd>+<kbd>⌘</kbd>+<kbd>5</kbd>) but the output video is a QuickTime video (`.mov`).

When using the video on websites, ideally it's in the [WebMedia (`.webm`) format](https://cloudinary.com/guides/video-formats/webm-format-what-you-should-know) of the video, which is a format specifically optimized for modern web environments.


## Research

I found this answer on [StackExchange](https://superuser.com/a/479391). Even though the input format was for `.mp4`, it worked for `.mov` as well.


### What does the command do?

> I asked ChatGPT for a breakdown of what the command is doing

This `ffmpeg` command is used to convert a video file from one format to another. Let's break down the various options and parameters used in the command:

1. `ffmpeg`: This is the command to run the FFmpeg software, a powerful multimedia framework that can handle audio, video, and other multimedia tasks.

2. `-i ./input.mov`: This specifies the input file for the conversion. In this case, it is `input.mov`, assumed to be located in the current working directory (`./`).

3. `-c:v libvpx`: This option selects the video codec to be used for the video encoding. Here, `libvpx` is the VP8/VP9 video codec developed by the WebM project.

4. `-quality good`: This sets the quality mode for the VP8/VP9 encoder to "good." The available options for quality are typically "good," "best," and "realtime," with "good" providing a balance between quality and encoding speed.

5. `-cpu-used 0`: This option determines the CPU usage level for video encoding. A value of 0 indicates the highest possible encoding quality at the expense of higher CPU usage and longer encoding time.

6. `-b:v 7000k`: This sets the target video bitrate to 7000 kbps (kilobits per second). The bitrate defines the amount of data allocated to represent each second of video. Higher bitrates generally result in better quality but also larger file sizes.

7. `-qmin 10 -qmax 42`: These options set the minimum and maximum quantization values for the VP8/VP9 encoder. Lower values result in higher quality but larger file sizes. The quantization parameter influences the level of compression applied to the video.

8. `-maxrate 500k -bufsize 1500k`: These options set the maximum video bitrate and buffer size for the VP8/VP9 encoder. These parameters are important for streaming scenarios and help control the data rate during encoding.

9. `-threads 8`: This specifies the number of threads to be used for video encoding. In this case, 8 threads will be used, which can improve encoding speed on multi-core processors.

10. `-vf scale=-1:1080`: This is a video filter (`-vf`) that scales the video. The `-1` in the width parameter means that the width will be automatically adjusted while maintaining the aspect ratio, and `1080` sets the height to 1080 pixels, effectively converting the video to a 1080p resolution.

11. `-c:a libvorbis`: This option selects the audio codec to be used for audio encoding. Here, `libvorbis` is the Vorbis audio codec, known for its good audio quality.

12. `-b:a 192k`: This sets the target audio bitrate to 192 kbps (kilobits per second). Similar to video bitrate, audio bitrate defines the amount of data allocated to represent each second of audio.

13. `-f webm`: This sets the output format to WebM, a multimedia format developed by Google that combines VP8/VP9 video and Vorbis audio, designed for web usage.

14. `./output.webm`: This specifies the output filename and location for the converted video. In this case, it will be saved as `output.webm` in the current working directory (`./`).

In summary, this `ffmpeg` command takes a video file called `input.mov`, converts it to WebM format with VP8/VP9 video and Vorbis audio codecs, scales it to 1080p resolution while maintaining aspect ratio, and applies specific settings for video and audio bitrate, quantization, and buffer size. The resulting WebM file will be saved as `output.webm`.

### Can macOS's video format be configured?

macOS's format for taking _screenshot images_ can be [configured from the default PNG format](https://macos-defaults.com/screenshots/type.html) by executing this in Terminal:

```sh
defaults write com.apple.screencapture "type" -string "jpg"
```

However, it doesn't seem like there's a way to change the default video format.

Upon investigating, the command above is basically setting what gets passed into the `screencapture` command. So when you execute the command `man screencapture`, to see the manual for `screencapture` which documents options and available formats:

```
-t      <format> Image format to create, default is png (other options include pdf, jpg, tiff and other formats).
```

Unfortunately, it doesn't seem like there's a configuration for video formats.
