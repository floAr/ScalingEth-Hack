using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ImageMagick;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Collections.Generic;

namespace ScalingETH
{

    public class Pin
    {
        public string cid { get; set; }
        public int size { get; set; }
        public string status { get; set; }
        public DateTime created { get; set; }
    }

    public class Deals
    {
        public string status { get; set; }
        public List<object> deals { get; set; }
    }

    public class Value
    {
        public string cid { get; set; }
        public int size { get; set; }
        public DateTime created { get; set; }
        public string type { get; set; }
        public string scope { get; set; }
        public List<object> files { get; set; }
        public Pin pin { get; set; }
        public Deals deals { get; set; }
    }

    public class Root
    {
        public bool ok { get; set; }
        public Value value { get; set; }
    }

    public class Response
    {
        public Root FullRes { get; set; }
        public Root Thumb { get; set; }
    }


    class PatientWebClient : WebClient
    {
        protected override WebRequest GetWebRequest(Uri uri)
        {
            WebRequest w = base.GetWebRequest(uri);
            w.Timeout = (int)TimeSpan.FromMinutes(4).TotalMilliseconds;
            return w;
        }
    }

    public static class ProcessImage
    {
        private static readonly string nftStorageApiKey = "";
        [FunctionName("ProcessImage")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            // create a http client for nft.storage
            // HttpClient newClient = new HttpClient();

            // // send the original image
            // HttpRequestMessage fullres = new HttpRequestMessage(HttpMethod.Post, "https://api.nft.storage/upload");
            // fullres.Headers.Add("Authorization", $"Bearer {nftStorageApiKey}");

            // //Read Server Response
            // HttpResponseMessage response = await newClient.SendAsync(fullres);
            // bool isValidMpn = await response.Content.ReadAsAsync<bool>();



            try
            {
                using (MemoryStream ms = new MemoryStream())
                using (var client = new PatientWebClient())
                {
                    {

                        await req.Body.CopyToAsync(ms);
                        ms.Position = 0;
                        client.Headers.Add("Authorization", $"Bearer {nftStorageApiKey}");

                        var fullres = client.UploadData("https://api.nft.storage/upload", "POST", ms.ToArray());
                        string utfString = Encoding.UTF8.GetString(fullres, 0, fullres.Length);
                        var fullR = JsonConvert.DeserializeObject<Root>(utfString);
                        log.LogInformation(fullR.ToString());
                        ms.Position = 0;
                        var info = new MagickImageInfo(ms);
                        var rescaleSize = Math.Min(Math.Max(info.Height, info.Width), 350);
                        ms.Position = 0;
                        if (info.Format == MagickFormat.Gif)
                        {
                            using (var imageCollection = new MagickImageCollection(ms))
                            {
                                // imageCollection.Coalesce();
                                // optimize gif array
                                foreach (var image in imageCollection)
                                {
                                    image.Scale(rescaleSize, rescaleSize);
                                }

                                var thumb = client.UploadData("https://api.nft.storage/upload", "POST", imageCollection.ToByteArray());
                                string thumbstr = Encoding.UTF8.GetString(thumb, 0, thumb.Length);
                                var thumbR = JsonConvert.DeserializeObject<Root>(thumbstr);
                                log.LogInformation(thumbR.ToString());

                                return new OkObjectResult(new Response()
                                {
                                    FullRes = fullR,
                                    Thumb = thumbR
                                });
                            }
                        }
                        else
                        {
                            using (var image = new MagickImage(ms))
                            {
                                // optimize static image
                                log.LogInformation(image.FormatInfo.Format.ToString());
                                image.Strip();
                                image.Interlace = Interlace.Png;
                                // image.BackgroundColor=new c
                                // image.Alpha(AlphaOption.Remove);
                                image.Quality = 75;
                                image.Scale(rescaleSize, rescaleSize);

                                var thumb = client.UploadData("https://api.nft.storage/upload", "POST", image.ToByteArray(image.FormatInfo.Format));
                                string thumbstr = Encoding.UTF8.GetString(thumb, 0, thumb.Length);
                                var thumbR = JsonConvert.DeserializeObject<Root>(thumbstr);
                                log.LogInformation(thumbR.ToString());

                                return new OkObjectResult(new Response()
                                {
                                    FullRes = fullR,
                                    Thumb = thumbR
                                });
                            }
                        }

                    }
                }
            }
            catch (Exception e)
            {

                return new BadRequestObjectResult("Not able to process image: " + e.Message + " - " + e.StackTrace);
            }
        }
    }
}
