

const asiaOceania = () => {

    return (
        <div>
            <form action="/asiaOceania" method="POST" enctype="multipart/form-data">
                <h3>画像をアップロードする</h3>
                <input type="file" name="sampleFile" accept="image/*" />
                <input type="submit" class="btn btn-primary" />
            </form>

            {/* {
                <div>
                    {{ #each rows }}
                    <p>↓に保存された画像が出力されます</p>
                    {{! < img src="/img/default.jpg" alt="sampleImage" /> }}
                    {{ #if this.image }}
                    <img src={{ this.image }} alt={{ this.image }} />
                    {{ else}}
                    <img src="" alt="" />
                    {{/if}}
                    <p>
                        {{ this.image }}
                    </p>
                    {{/ each}}
                </div>} */}


        </div >
    );
}

export default asiaOceania