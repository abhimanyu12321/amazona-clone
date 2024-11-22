Get-ChildItem -Path ".\src" -Recurse -Filter "*.js" | 
Where-Object { $_.Name -ne "store.js" -and $_.Name -ne "baseAPI.js" } |
ForEach-Object {
    $newName = $_.FullName -replace '\.js$', '.jsx'
    Rename-Item -Path $_.FullName -NewName $newName
}
